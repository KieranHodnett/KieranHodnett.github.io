"""
GitHub PR Review Comment Scraper
Fetches all pull requests where you're the author and extracts review comments from a specific reviewer.
"""

import os
from github import Github
from typing import List, Dict, Any
from datetime import datetime


class PRCommentScraper:
    def __init__(self, github_token: str, repo_owner: str, repo_name: str):
        """
        Initialize the scraper with GitHub credentials and repository info.
        
        Args:
            github_token: GitHub personal access token
            repo_owner: Repository owner username
            repo_name: Repository name
        """
        from github import GithubException
        
        self.github = Github(github_token)
        self.repo_owner = repo_owner
        self.repo_name = repo_name
        
        try:
            self.repo = self.github.get_repo(f"{repo_owner}/{repo_name}")
        except GithubException as e:
            if e.status == 404:
                print(f"\n❌ Repository '{repo_owner}/{repo_name}' not found!")
                print("\nPossible issues:")
                print("  1. Repository name or owner is incorrect")
                print("  2. Repository is private and your token doesn't have access")
                print("  3. Repository doesn't exist")
                print("\nHow to fix:")
                print("  1. Go to the repository on GitHub")
                print(f"  2. Check the URL: https://github.com/OWNER/REPO")
                print("  3. Update REPO_OWNER and REPO_NAME in your .env file")
                print("\nTip: Run 'python test_config.py' to diagnose configuration issues")
                raise
            else:
                print(f"\n❌ Error accessing repository: {e.data.get('message', str(e))}")
                raise
        
    def fetch_my_pull_requests(self, author_username: str, state: str = "all") -> List[Any]:
        """
        Fetch all pull requests where the given user is the author.
        
        Args:
            author_username: GitHub username of the PR author
            state: PR state filter ("open", "closed", "all")
            
        Returns:
            List of PullRequest objects
        """
        print(f"Fetching pull requests by {author_username} from {self.repo_owner}/{self.repo_name}...")
        
        pull_requests = self.repo.get_pulls(state=state, sort='created', direction='desc')
        my_prs = [pr for pr in pull_requests if pr.user.login == author_username]
        
        print(f"Found {len(my_prs)} pull requests by {author_username}")
        return my_prs
    
    def extract_review_comments(self, pull_request, reviewer_username: str) -> List[Dict[str, Any]]:
        """
        Extract all review comments from a specific reviewer on a pull request.
        
        Args:
            pull_request: PullRequest object
            reviewer_username: GitHub username of the reviewer to filter by
            
        Returns:
            List of dictionaries containing comment data
        """
        comments = []
        
        # Get review comments (comments on specific lines of code)
        for comment in pull_request.get_review_comments():
            if comment.user.login == reviewer_username:
                comments.append({
                    'type': 'review_comment',
                    'pr_number': pull_request.number,
                    'pr_title': pull_request.title,
                    'pr_url': pull_request.html_url,
                    'body': comment.body,
                    'path': comment.path,
                    'position': comment.position,
                    'line': comment.line if hasattr(comment, 'line') else None,
                    'created_at': comment.created_at.isoformat(),
                    'reviewer': reviewer_username
                })
        
        # Get review-level comments (general comments on the PR review)
        for review in pull_request.get_reviews():
            if review.user.login == reviewer_username and review.body:
                comments.append({
                    'type': 'review',
                    'pr_number': pull_request.number,
                    'pr_title': pull_request.title,
                    'pr_url': pull_request.html_url,
                    'body': review.body,
                    'state': review.state,
                    'created_at': review.submitted_at.isoformat() if review.submitted_at else None,
                    'reviewer': reviewer_username
                })
        
        return comments
    
    def scrape_all_comments(self, author_username: str, reviewer_username: str) -> Dict[str, Any]:
        """
        Main method to scrape all review comments from a specific reviewer on PRs by a specific author.
        
        Args:
            author_username: GitHub username of the PR author (you)
            reviewer_username: GitHub username of the reviewer (your boss)
            
        Returns:
            Dictionary containing all comments and metadata
        """
        print(f"\n{'='*60}")
        print(f"Starting GitHub PR Review Comment Scraper")
        print(f"{'='*60}")
        print(f"Repository: {self.repo_owner}/{self.repo_name}")
        print(f"PR Author: {author_username}")
        print(f"Reviewer: {reviewer_username}")
        print(f"{'='*60}\n")
        
        # Fetch all PRs by the author
        pull_requests = self.fetch_my_pull_requests(author_username)
        
        if not pull_requests:
            print(f"No pull requests found for author {author_username}")
            return {
                'metadata': {
                    'repo': f"{self.repo_owner}/{self.repo_name}",
                    'author': author_username,
                    'reviewer': reviewer_username,
                    'total_prs': 0,
                    'total_comments': 0,
                    'scraped_at': datetime.now().isoformat()
                },
                'comments': []
            }
        
        # Extract comments from each PR
        all_comments = []
        for i, pr in enumerate(pull_requests, 1):
            print(f"Processing PR #{pr.number}: {pr.title} ({i}/{len(pull_requests)})")
            pr_comments = self.extract_review_comments(pr, reviewer_username)
            all_comments.extend(pr_comments)
            print(f"  Found {len(pr_comments)} comments from {reviewer_username}")
        
        print(f"\n{'='*60}")
        print(f"Scraping complete!")
        print(f"Total PRs processed: {len(pull_requests)}")
        print(f"Total comments found: {len(all_comments)}")
        print(f"{'='*60}\n")
        
        return {
            'metadata': {
                'repo': f"{self.repo_owner}/{self.repo_name}",
                'author': author_username,
                'reviewer': reviewer_username,
                'total_prs': len(pull_requests),
                'total_comments': len(all_comments),
                'scraped_at': datetime.now().isoformat()
            },
            'comments': all_comments
        }


def format_comments_for_display(data: Dict[str, Any]) -> str:
    """
    Format scraped comments into a readable text format.
    
    Args:
        data: Dictionary containing metadata and comments
        
    Returns:
        Formatted string for display/saving
    """
    output = []
    metadata = data['metadata']
    comments = data['comments']
    
    # Header
    output.append("=" * 80)
    output.append("GITHUB PR REVIEW COMMENTS ANALYSIS")
    output.append("=" * 80)
    output.append(f"Repository: {metadata['repo']}")
    output.append(f"PR Author: {metadata['author']}")
    output.append(f"Reviewer: {metadata['reviewer']}")
    output.append(f"Total PRs: {metadata['total_prs']}")
    output.append(f"Total Comments: {metadata['total_comments']}")
    output.append(f"Scraped at: {metadata['scraped_at']}")
    output.append("=" * 80)
    output.append("")
    
    if not comments:
        output.append("No comments found.")
        return "\n".join(output)
    
    # Group comments by PR
    comments_by_pr = {}
    for comment in comments:
        pr_num = comment['pr_number']
        if pr_num not in comments_by_pr:
            comments_by_pr[pr_num] = {
                'title': comment['pr_title'],
                'url': comment['pr_url'],
                'comments': []
            }
        comments_by_pr[pr_num]['comments'].append(comment)
    
    # Display comments grouped by PR
    for pr_num in sorted(comments_by_pr.keys(), reverse=True):
        pr_data = comments_by_pr[pr_num]
        output.append(f"\nPR #{pr_num}: {pr_data['title']}")
        output.append(f"URL: {pr_data['url']}")
        output.append("-" * 80)
        
        for i, comment in enumerate(pr_data['comments'], 1):
            output.append(f"\nComment {i} ({comment['type']}):")
            if comment.get('path'):
                output.append(f"  File: {comment['path']}")
            if comment.get('state'):
                output.append(f"  Review State: {comment['state']}")
            output.append(f"  Created: {comment['created_at']}")
            output.append(f"\n  {comment['body']}")
            output.append("")
        
        output.append("-" * 80)
    
    return "\n".join(output)
