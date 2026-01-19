"""
Claude AI Analyzer for PR Review Comments
Processes review comments and generates a personalized code review style guide.
"""

import os
from typing import Dict, Any, List
from anthropic import Anthropic


class ReviewStyleAnalyzer:
    def __init__(self, api_key: str, model: str = None):
        """
        Initialize the analyzer with Anthropic API key.
        
        Args:
            api_key: Anthropic API key
            model: Optional model name override (defaults to Claude 3.5 Sonnet)
        """
        self.client = Anthropic(api_key=api_key)
        # Use Claude Sonnet 4 or allow override via parameter/env
        self.model = model or os.getenv('CLAUDE_MODEL', 'claude-sonnet-4-20250514')
    
    def analyze_comments(self, comments_data: Dict[str, Any]) -> str:
        """
        Analyze review comments using Claude AI to generate a personalized style guide.
        
        Args:
            comments_data: Dictionary containing metadata and comments
            
        Returns:
            Generated style guide as a string
        """
        comments = comments_data['comments']
        metadata = comments_data['metadata']
        
        if not comments:
            return "No comments to analyze."
        
        print(f"\n{'='*60}")
        print(f"Starting Claude AI Analysis")
        print(f"{'='*60}")
        print(f"Analyzing {len(comments)} comments...")
        
        # Prepare the comments for Claude
        comments_text = self._format_comments_for_analysis(comments)
        
        # Create the analysis prompt
        prompt = self._create_analysis_prompt(comments_text, metadata)
        
        # Call Claude API
        print("Sending request to Claude API...")
        response = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            temperature=0.7,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        analysis = response.content[0].text
        
        print("Analysis complete!")
        print(f"{'='*60}\n")
        
        return analysis
    
    def _format_comments_for_analysis(self, comments: List[Dict[str, Any]]) -> str:
        """
        Format comments into a structure suitable for Claude analysis.
        
        Args:
            comments: List of comment dictionaries
            
        Returns:
            Formatted string of comments
        """
        formatted = []
        for i, comment in enumerate(comments, 1):
            formatted.append(f"Comment {i}:")
            formatted.append(f"PR: #{comment['pr_number']} - {comment['pr_title']}")
            formatted.append(f"Type: {comment['type']}")
            if comment.get('path'):
                formatted.append(f"File: {comment['path']}")
            formatted.append(f"Comment: {comment['body']}")
            formatted.append("")
        
        return "\n".join(formatted)
    
    def _create_analysis_prompt(self, comments_text: str, metadata: Dict[str, Any]) -> str:
        """
        Create the prompt for Claude to analyze the comments.
        
        Args:
            comments_text: Formatted comments string
            metadata: Metadata about the scraping session
            
        Returns:
            Prompt string
        """
        prompt = f"""You are analyzing code review comments from {metadata['reviewer']} on pull requests by {metadata['author']} in the repository {metadata['repo']}.

Your task is to analyze these {metadata['total_comments']} review comments and generate a comprehensive, personalized code review style guide that captures the reviewer's patterns, preferences, and principles.

Here are all the review comments:

{comments_text}

Please analyze these comments and generate a detailed code review style guide with the following sections:

1. **Overview**: A brief summary of the reviewer's overall style and approach to code reviews.

2. **Key Themes & Categories**: Group the feedback into major themes or categories (e.g., Code Quality, Testing, Documentation, Performance, Security, Architecture, etc.). For each theme:
   - Describe the theme
   - Note how frequently it appears
   - Explain why it matters to this reviewer

3. **Core Review Principles**: Extract and articulate the underlying principles and rules that guide this reviewer's feedback. For each principle:
   - State the rule clearly
   - Provide 2-3 actual examples from the comments that illustrate this rule
   - Explain the reasoning behind the rule

4. **Common Patterns**: Identify specific patterns in the feedback, such as:
   - Specific coding practices the reviewer emphasizes
   - Common issues or anti-patterns they call out
   - Positive patterns they appreciate

5. **Communication Style**: Analyze how the reviewer communicates feedback:
   - Tone (direct, collaborative, educational, etc.)
   - Level of detail
   - Use of questions vs. statements
   - Balance of criticism and praise

6. **Actionable Checklist**: Create a practical checklist that the PR author can use before submitting future PRs to anticipate this reviewer's feedback.

Format the output as a well-structured document with clear headings, bullet points, and examples. Make it practical and actionable."""

        return prompt
    
    def generate_combined_report(self, comments_data: Dict[str, Any], analysis: str) -> str:
        """
        Generate a combined report with both raw comments and AI analysis.
        
        Args:
            comments_data: Dictionary containing metadata and comments
            analysis: Claude's analysis string
            
        Returns:
            Combined report as a formatted string
        """
        from scraper import format_comments_for_display
        
        raw_comments = format_comments_for_display(comments_data)
        
        report = []
        report.append("=" * 80)
        report.append("PERSONALIZED CODE REVIEW STYLE GUIDE")
        report.append("=" * 80)
        report.append("")
        report.append(analysis)
        report.append("")
        report.append("\n" + "=" * 80)
        report.append("RAW REVIEW COMMENTS")
        report.append("=" * 80)
        report.append("")
        report.append(raw_comments)
        
        return "\n".join(report)
