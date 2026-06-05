#!/usr/bin/env python3
"""Local dev server – serves everything with no-cache for .json files."""
import http.server
import os

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith(".json"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        print(fmt % args)

os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.test(HandlerClass=NoCacheHandler, port=8000, bind="")
