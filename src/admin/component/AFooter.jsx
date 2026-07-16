import React from 'react';

const AFooter = () => {
  return (
    <footer className="bg-white border-top py-3 mt-auto text-center text-muted small">
      <div className="container-fluid">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} NexShop Admin Portal. All rights reserved. System Version 1.0.0.
        </p>
      </div>
    </footer>
  );
};

export default AFooter;
