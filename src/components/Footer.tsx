import React from 'react';
import { XIcon, GithubIcon, HeartIcon, GlobeIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-8 bg-white border-t">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-2">
          <HeartIcon className="w-5 h-5 text-red-500" />
          <span className="text-gray-600">Opensourced with love by</span>
        </div>
        
        <div className="flex items-center space-x-4 flex-wrap justify-center">
          <a
            href="https://twitter.com/senthazalravi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-400 transition-colors"
          >
            <XIcon className="w-5 h-5" />
            <span>@senthazalravi</span>
          </a>
          
          <span className="text-gray-300">|</span>
          
          <a
            href="https://github.com/ravindranantony/familytodo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>

          <span className="text-gray-300">|</span>

          <a
            href="https://familytodo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-violet-600 transition-colors"
          >
            <GlobeIcon className="w-5 h-5" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </footer>
  );
};