import React from 'react';

const Footer: React.FC = () => {
  return (

    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} Dark Souls Interactive Guide. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;