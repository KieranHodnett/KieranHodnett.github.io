#!/usr/bin/env python3
"""
STEP 2: Analyze Comments with Claude AI
========================================
Analyzes cached comments and generates a personalized code review style guide.

Usage:
    python analyze_only.py

Requirements:
    - comments_cache.json (created by running create_cache.py first)
    - .env file with ANTHROPIC_API_KEY configured

Output:
    - style_guide.txt: AI-generated personalized review style guide

Can be run multiple times without re-scraping GitHub.
"""

import os
import sys
import json
from dotenv import load_dotenv
from scraper import PRCommentScraper
from analyzer import ReviewStyleAnalyzer


def load_or_scrape_comments():
    """Load existing comments from JSON cache or scrape them."""
    cache_file = "comments_cache.json"
    
    # Check if we have cached data
    if os.path.exists(cache_file):
        print(f"Loading cached comments from {cache_file}...")
        with open(cache_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"Loaded {data['metadata']['total_comments']} comments from cache\n")
        return data
    
    # If no cache, need to scrape
    print("No cached data found. You need to run main.py first to scrape comments.")
    print("Or manually create comments_cache.json with the scraped data.\n")
    sys.exit(1)


def main():
    """Run only the analysis phase."""
    print("=" * 70)
    print("STANDALONE CLAUDE AI ANALYZER")
    print("=" * 70)
    print()
    
    # Load environment
    load_dotenv()
    anthropic_key = os.getenv('ANTHROPIC_API_KEY')
    
    if not anthropic_key:
        print("ERROR: ANTHROPIC_API_KEY not found in .env file")
        print("Please add your Anthropic API key to run analysis.")
        sys.exit(1)
    
    # Load comments data
    comments_data = load_or_scrape_comments()
    
    if comments_data['metadata']['total_comments'] == 0:
        print("No comments found in cached data. Nothing to analyze.")
        sys.exit(0)
    
    # Run analysis
    print("Starting Claude AI analysis...")
    print("-" * 70)
    
    analyzer = ReviewStyleAnalyzer(api_key=anthropic_key)
    analysis = analyzer.analyze_comments(comments_data)
    
    # Generate and save report
    combined_report = analyzer.generate_combined_report(comments_data, analysis)
    
    output_file = "style_guide.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(combined_report)
    
    print(f"\n✓ Analysis complete!")
    print(f"✓ Style guide saved to: {output_file}")
    print()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user.")
        sys.exit(0)
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
