import React from 'react';

interface RepoModalProps {
  visibility: string;
  html_url: string;
  description: string;
  language: string;
  name: string;
  onClose: () => void;
}

const RepoModal: React.FC<RepoModalProps> = ({ name, visibility, html_url, description, language, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white w-full md:w-5/6 lg:w-3/4 xl:w-2/3 h-auto md:h-5/6 p-4 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          Fechar
        </button>
        <p className="text-2xl font-semibold text-gray-800">Especificações</p>
        <h1 className="font-semibold text-2xl md:text-4xl mt-3 text-center">{name}</h1>
        <hr className="border-t-1 border-gray-400 mb-2 mt-4" />
        <p className="text-gray-500 font-semibold mt-3 md:mt-9 ml-4 md:ml-8">Link</p>
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 ml-4 md:ml-8 hover:underline mt-1 block">
          Ver no GitHub
        </a>
        <p className="text-gray-500 font-semibold mt-3 md:mt-8 ml-4 md:ml-8">Privacidade</p>
        <p className="font-semibold ml-4 md:ml-8">{visibility}</p>
        <p className="text-gray-500 font-semibold mt-3 md:mt-8 ml-4 md:ml-8">Linguagem</p>
        <p className="font-semibold ml-4 md:ml-8">{language || 'Não especificada'}</p>
        <p className="text-gray-500 font-semibold mt-3 md:mt-8 ml-4 md:ml-8">Descrição</p>
        <p className="font-semibold ml-4 md:ml-8">{description || 'Nenhuma descrição disponível.'}</p>
      </div>
    </div>
  );
};

export default RepoModal;
