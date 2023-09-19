import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RepoModal from './RepoModal';

interface UserData {
  avatar_url: string;
  name: string;
  bio: string;
}

interface UserRepos {
  name: string;
  description: string;
  language: string;
  private: boolean;
  html_url: string;
}

const ITEMS_PER_PAGE = 3;

const UserProfile: React.FC = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRepos, setUserRepos] = useState<UserRepos[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<UserRepos | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (location.state) {
      const { userData, userRepos } = location.state as { userData: UserData; userRepos: UserRepos[] };
      setUserData(userData);
      setUserRepos(userRepos);
    }
  }, [location.state]);

  const openRepoModal = (repo: UserRepos) => {
    setSelectedRepo(repo);
  };

  const closeRepoModal = () => {
    setSelectedRepo(null);
  };

  const paginatedRepos = userRepos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col overflow-y-hidden">
      <div className="flex bg-white shadow-md text-black p-4">
        <Link to="/" className="hover:underline mr-auto">
          &#8592; Voltar à página de pesquisa
        </Link>
        <svg width="153" height="27" viewBox="0 0 153 27" fill="none" className='mr-6' xmlns="http://www.w3.org/2000/svg">
          <path d="M55.1308 26.7609C53.8565 26.7609 52.6663 26.5084 51.5603 26.0035C50.4783 25.4986 49.6007 24.7292 48.9275 23.6953C48.2783 22.6614 47.9537 21.363 47.9537 19.8002V7.82629H53.5439V20.5215C53.5439 20.81 53.616 21.0745 53.7603 21.3149C53.9045 21.5554 54.0969 21.7477 54.3373 21.892C54.5778 22.0362 54.8423 22.1084 55.1308 22.1084C55.4193 22.1084 55.6838 22.0362 55.9242 21.892C56.1647 21.7477 56.357 21.5554 56.5013 21.3149C56.6455 21.0745 56.7177 20.81 56.7177 20.5215V14.3542C56.7177 12.8635 57.0303 11.6012 57.6554 10.5673C58.2805 9.53341 59.1341 8.75198 60.2161 8.22301C61.3221 7.67 62.5603 7.3935 63.9309 7.3935C65.3014 7.3935 66.5276 7.67 67.6096 8.22301C68.6915 8.75198 69.5451 9.53341 70.1702 10.5673C70.7954 11.6012 71.108 12.8635 71.108 14.3542V20.5215C71.108 20.81 71.1801 21.0745 71.3244 21.3149C71.4686 21.5554 71.661 21.7477 71.9014 21.892C72.1659 22.0362 72.4424 22.1084 72.7309 22.1084C73.0194 22.1084 73.2839 22.0362 73.5244 21.892C73.7648 21.7477 73.9572 21.5554 74.1014 21.3149C74.2457 21.0745 74.3178 20.81 74.3178 20.5215V7.82629H79.908V19.8002C79.908 21.363 79.5714 22.6614 78.8982 23.6953C78.249 24.7292 77.3714 25.4986 76.2654 26.0035C75.1834 26.5084 74.0052 26.7609 72.7309 26.7609C71.4566 26.7609 70.2664 26.5084 69.1604 26.0035C68.0784 25.4986 67.2008 24.7292 66.5276 23.6953C65.8544 22.6614 65.5177 21.363 65.5177 19.8002V13.669C65.5177 13.3564 65.4456 13.0799 65.3014 12.8394C65.1571 12.599 64.9647 12.4067 64.7243 12.2624C64.4839 12.1181 64.2194 12.046 63.9309 12.046C63.6423 12.046 63.3658 12.1181 63.1013 12.2624C62.8609 12.4067 62.6685 12.599 62.5243 12.8394C62.38 13.0799 62.3079 13.3564 62.3079 13.669V19.8002C62.3079 21.363 61.9713 22.6614 61.298 23.6953C60.6489 24.7292 59.7713 25.4986 58.6652 26.0035C57.5833 26.5084 56.4051 26.7609 55.1308 26.7609Z" fill="#05478A" />
          <path d="M90.8704 26.3281C89.1632 26.3281 87.8288 25.8472 86.867 24.8854C85.9053 23.8996 85.4244 22.5772 85.4244 20.9182V3.31806H91.0507V20.5936C91.0507 20.8821 91.1469 21.1346 91.3392 21.351C91.5556 21.5433 91.8081 21.6395 92.0966 21.6395H96.136V26.3281H90.8704ZM82.3949 12.4067V7.82629H96.136V12.4067H82.3949Z" fill="#05478A" />
          <path d="M108.583 26.3281C106.492 26.3281 104.652 25.9434 103.065 25.174C101.479 24.3805 100.24 23.2985 99.3506 21.928C98.485 20.5335 98.0522 18.9226 98.0522 17.0952C98.0522 15.0755 98.473 13.3444 99.3146 11.9017C100.156 10.4591 101.274 9.35308 102.669 8.58367C104.087 7.79022 105.65 7.3935 107.357 7.3935C109.305 7.3935 110.928 7.80225 112.226 8.61974C113.549 9.43723 114.546 10.5553 115.22 11.9739C115.893 13.3684 116.229 14.9673 116.229 16.7706C116.229 17.0832 116.205 17.4559 116.157 17.8887C116.133 18.2974 116.097 18.622 116.049 18.8624H103.931C104.075 19.4876 104.352 20.0166 104.761 20.4493C105.169 20.8821 105.686 21.2067 106.311 21.4231C106.936 21.6155 107.634 21.7116 108.403 21.7116H114.065V26.3281H108.583ZM103.787 15.3641H110.82C110.771 14.9794 110.699 14.6067 110.603 14.246C110.507 13.8854 110.351 13.5728 110.134 13.3083C109.942 13.0198 109.714 12.7793 109.449 12.587C109.185 12.3706 108.872 12.2023 108.511 12.0821C108.175 11.9618 107.79 11.9017 107.357 11.9017C106.804 11.9017 106.311 11.9979 105.879 12.1903C105.446 12.3826 105.085 12.6471 104.797 12.9837C104.508 13.2963 104.28 13.669 104.111 14.1018C103.967 14.5105 103.859 14.9313 103.787 15.3641Z" fill="#05478A" />
          <path d="M128.575 26.3281C126.652 26.3281 124.945 25.9313 123.454 25.1379C121.963 24.3204 120.785 23.2264 119.919 21.8559C119.054 20.4614 118.621 18.8745 118.621 17.0952C118.621 15.316 119.054 13.7411 119.919 12.3706C120.785 10.976 121.963 9.87002 123.454 9.05253C124.945 8.23504 126.652 7.82629 128.575 7.82629H131.352V12.5509H128.792C127.854 12.5509 127.048 12.7553 126.375 13.164C125.702 13.5487 125.173 14.0897 124.788 14.787C124.428 15.4602 124.247 16.2296 124.247 17.0952C124.247 17.9608 124.428 18.7422 124.788 19.4395C125.173 20.1127 125.702 20.6537 126.375 21.0625C127.048 21.4472 127.854 21.6395 128.792 21.6395H131.352V26.3281H128.575Z" fill="#05478A" />
          <path d="M134.455 26.3281V0H140.046V9.05253C140.767 8.47548 141.56 8.05471 142.426 7.79023C143.292 7.52574 144.157 7.3935 145.023 7.3935C146.706 7.3935 148.124 7.75416 149.278 8.47548C150.457 9.19679 151.334 10.1826 151.911 11.4329C152.512 12.6832 152.813 14.1017 152.813 15.6886V26.3281H147.223V15.905C147.223 15.2078 147.054 14.5946 146.718 14.0657C146.405 13.5127 145.972 13.0799 145.419 12.7673C144.89 12.4307 144.301 12.2624 143.652 12.2624C143.003 12.2624 142.402 12.4187 141.849 12.7312C141.296 13.0438 140.851 13.4646 140.514 13.9936C140.202 14.5225 140.046 15.1236 140.046 15.7968V26.3281H134.455Z" fill="#05478A" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.973778 23.3947C1.64701 24.4286 2.52461 25.198 3.60659 25.7029C4.71261 26.2078 5.90278 26.4603 7.17711 26.4603C8.082 26.4603 8.9384 26.333 9.74631 26.0784C9.41153 25.9744 9.08381 25.8493 8.76317 25.7029C7.6812 25.198 6.8036 24.4286 6.13037 23.3947C5.48118 22.3608 5.15659 21.0624 5.15659 19.4996V7.52571L5.59021 7.5257H0V19.4996C0 21.0624 0.324593 22.3608 0.973778 23.3947ZM10.7468 8.96464V20.2209C10.7468 20.5094 10.8189 20.7739 10.9632 21.0143C11.1075 21.2548 11.2998 21.4471 11.5402 21.5914C11.7807 21.7357 12.0452 21.8078 12.3337 21.8078C12.6222 21.8078 12.8867 21.7357 13.1271 21.5914C13.3676 21.4471 13.5599 21.2548 13.7042 21.0143C13.8485 20.7739 13.9206 20.5094 13.9206 20.2209V14.0536C13.9206 12.5629 14.2332 11.3006 14.8583 10.2667C15.4834 9.23282 16.337 8.45139 17.419 7.92243C17.7809 7.74145 18.157 7.59009 18.5473 7.46834C17.7559 7.21806 16.8992 7.09291 15.9772 7.09291C14.6067 7.09291 13.3684 7.36942 12.2624 7.92243C11.6942 8.20021 11.189 8.54761 10.7468 8.96464ZM26.3641 8.99894C26.7489 9.36799 27.0853 9.79058 27.3732 10.2667C27.9983 11.3006 28.3109 12.5629 28.3109 14.0536V20.2209C28.3109 20.5094 28.383 20.7739 28.5273 21.0143C28.6715 21.2548 28.8639 21.4471 29.1043 21.5914C29.3688 21.7357 29.6453 21.8078 29.9338 21.8078C30.2224 21.8078 30.4868 21.7357 30.7273 21.5914C30.9677 21.4471 31.1601 21.2548 31.3043 21.0143C31.4486 20.7739 31.5207 20.5094 31.5207 20.2209V7.52571L31.9544 7.5257H26.3641V8.99894ZM27.3464 26.0784C27.0117 25.9744 26.684 25.8493 26.3633 25.7029C25.2813 25.198 24.4037 24.4286 23.7305 23.3947C23.0573 22.3608 22.7207 21.0624 22.7207 19.4996V13.3684C22.7207 13.0558 22.6485 12.7793 22.5043 12.5389C22.36 12.2984 22.1677 12.1061 21.9272 11.9618C21.6868 11.8175 21.4223 11.7454 21.1338 11.7454C20.8452 11.7454 20.5687 11.8175 20.3042 11.9618C20.0638 12.1061 19.8715 12.2984 19.7272 12.5389C19.5829 12.7793 19.5108 13.0558 19.5108 13.3684V19.4996C19.5108 21.0339 19.1863 22.3134 18.5374 23.3379C18.5495 23.3569 18.5616 23.3758 18.5739 23.3947C19.2471 24.4286 20.1248 25.198 21.2067 25.7029C22.3127 26.2078 23.5029 26.4603 24.7772 26.4603C25.6821 26.4603 26.5385 26.333 27.3464 26.0784Z" fill="#FFB629" />
        </svg>
      </div>
      <div className="flex-grow overflow-y-hidden p-4">
        <h1 className="text-3xl mb-4 ml-2 font-semibold text-gray-800">Informações do perfil</h1>
        {userData && (
          <div className="bg-white rounded-lg p-4 shadow-md mb-6 ml-8 max-w-[40%]">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  src={userData.avatar_url}
                  alt="Avatar do usuário"
                  className="w-12 h-12 lg:w-20 lg:h-20 rounded-full"
                />
              </div>
              <div className="ml-4">
                <span className="font-semibold text-sm">Nome:</span>
                <h2 className="text-lg font-semibold">{userData.name}</h2>
                <span className="font-semibold text-sm">Bio:</span>
                <p className="text-gray-600 text-sm">{userData.bio}</p>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl mb-1 ml-2 font-semibold text-gray-800">Repositórios</h1>
        <div className="flex justify-center">
          <div className="w-full">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center mr-14">
                <p className="text-gray-600 text-2xl">
                  {currentPage}/{Math.ceil(userRepos.length / ITEMS_PER_PAGE)}
                </p>
                <button
                  onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white hover:border-transparent focus:outline-none ml-2"
                >
                  &#8592;
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(userRepos.length / ITEMS_PER_PAGE)))
                  }
                  disabled={currentPage === Math.ceil(userRepos.length / ITEMS_PER_PAGE)}
                  className="bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white hover:border-transparent focus:outline-none ml-2"
                >
                  &#8594;
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {paginatedRepos.map((repo, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 mb-8 mx-4 border border-gray-300 shadow-md cursor-pointer"
                  onClick={() => openRepoModal(repo)}
                >
                  <h2 className="text-lg font-semibold mb-6">{repo.name}</h2>
                  <hr className="border-t-2 border-blue-500 mb-6" />
                  <p className="text-black mb-2">Link do GitHub:</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel=""
                    className="text-blue-500 hover:underline text-sm truncate"
                  >
                    {repo.html_url}
                  </a>
                  <p className="text-black mt-6">Descrição:</p>
                  <p className="text-gray-600 text-sm mt-2 truncate">{repo.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedRepo && (
        <RepoModal
          name={selectedRepo.name}
          visibility={selectedRepo.private ? 'Privado' : 'Público'}
          html_url={selectedRepo.html_url}
          description={selectedRepo.description}
          language={selectedRepo.language}
          onClose={closeRepoModal}
        />
      )}
    </div>
  );
};

export default UserProfile;
