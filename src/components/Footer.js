import React from 'react';

const Footer = () => (
  <footer className="bg-slate-900 py-6 text-white">
    <div className="mx-auto w-full max-w-6xl px-6 text-center text-sm text-slate-300">
      © {new Date().getFullYear()} MeraSoftware Admin. All rights reserved.
    </div>
  </footer>
);

export default Footer;
