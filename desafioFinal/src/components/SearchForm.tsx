import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Por favor, insira um nome de usuário do GitHub.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

      const userData = userResponse.data;
      const userRepos = reposResponse.data;

      navigate(`/user/${username}`, { state: { userData, userRepos } });
    } catch (err) {
      setError('Ocorreu um erro ao buscar os dados do usuário. Verifique o nome de usuário.');
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex flex-col lg:flex-row">
    <div className="w-full lg:w-8/12 bg-blue-800 p-4 flex justify-center items-center">
      <svg width="257" height="55" viewBox="0 0 307 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M110.763 54.1404C108.203 54.1404 105.812 53.6333 103.59 52.6189C101.416 51.6045 99.6532 50.0589 98.3007 47.9818C96.9966 45.9048 96.3445 43.2965 96.3445 40.1568V16.1021H107.575V41.6059C107.575 42.1855 107.72 42.7169 108.01 43.1999C108.299 43.6829 108.686 44.0693 109.169 44.3591C109.652 44.649 110.183 44.7939 110.763 44.7939C111.342 44.7939 111.874 44.649 112.357 44.3591C112.84 44.0693 113.226 43.6829 113.516 43.1999C113.806 42.7169 113.951 42.1855 113.951 41.6059V29.2163C113.951 26.2215 114.579 23.6856 115.835 21.6086C117.09 19.5316 118.805 17.9617 120.979 16.8991C123.201 15.7881 125.688 15.2326 128.442 15.2326C131.195 15.2326 133.658 15.7881 135.832 16.8991C138.006 17.9617 139.72 19.5316 140.976 21.6086C142.232 23.6856 142.86 26.2215 142.86 29.2163V41.6059C142.86 42.1855 143.005 42.7169 143.295 43.1999C143.584 43.6829 143.971 44.0693 144.454 44.3591C144.985 44.649 145.541 44.7939 146.12 44.7939C146.7 44.7939 147.231 44.649 147.714 44.3591C148.197 44.0693 148.584 43.6829 148.874 43.1999C149.163 42.7169 149.308 42.1855 149.308 41.6059V16.1021H160.539V40.1568C160.539 43.2965 159.862 45.9048 158.51 47.9818C157.206 50.0589 155.443 51.6045 153.221 52.6189C151.047 53.6333 148.68 54.1404 146.12 54.1404C143.56 54.1404 141.169 53.6333 138.947 52.6189C136.774 51.6045 135.011 50.0589 133.658 47.9818C132.306 45.9048 131.63 43.2965 131.63 40.1568V27.8396C131.63 27.2117 131.485 26.6562 131.195 26.1732C130.905 25.6902 130.519 25.3038 130.036 25.0139C129.553 24.7241 129.021 24.5792 128.442 24.5792C127.862 24.5792 127.306 24.7241 126.775 25.0139C126.292 25.3038 125.906 25.6902 125.616 26.1732C125.326 26.6562 125.181 27.2117 125.181 27.8396V40.1568C125.181 43.2965 124.505 45.9048 123.152 47.9818C121.848 50.0589 120.085 51.6045 117.863 52.6189C115.69 53.6333 113.323 54.1404 110.763 54.1404Z" fill="white"/>
        <path d="M182.561 53.271C179.132 53.271 176.451 52.3049 174.519 50.3728C172.587 48.3924 171.621 45.7358 171.621 42.4029V7.04535H182.924V41.7508C182.924 42.3304 183.117 42.8376 183.503 43.2723C183.938 43.6588 184.445 43.852 185.025 43.852H193.14V53.271H182.561ZM165.535 25.3038V16.1021H193.14V25.3038H165.535Z" fill="white"/>
        <path d="M218.146 53.271C213.944 53.271 210.248 52.4982 207.06 50.9525C203.872 49.3585 201.385 47.1849 199.598 44.4316C197.859 41.6301 196.989 38.3938 196.989 34.7228C196.989 30.6653 197.835 27.1876 199.525 24.2894C201.216 21.3912 203.462 19.1693 206.263 17.6236C209.113 16.0296 212.253 15.2326 215.682 15.2326C219.595 15.2326 222.855 16.0538 225.464 17.6961C228.12 19.3384 230.125 21.5844 231.477 24.4343C232.83 27.2359 233.506 30.448 233.506 34.0707C233.506 34.6986 233.458 35.4473 233.361 36.3168C233.313 37.1379 233.24 37.79 233.144 38.273H208.799C209.089 39.5289 209.645 40.5915 210.466 41.461C211.287 42.3304 212.325 42.9825 213.581 43.4172C214.837 43.8037 216.238 43.9969 217.784 43.9969H229.159V53.271H218.146ZM208.51 31.245H222.638C222.541 30.4721 222.397 29.7234 222.203 28.9989C222.01 28.2744 221.696 27.6464 221.261 27.1151C220.875 26.5355 220.416 26.0524 219.885 25.666C219.353 25.2313 218.726 24.8932 218.001 24.6517C217.325 24.4102 216.552 24.2894 215.682 24.2894C214.571 24.2894 213.581 24.4826 212.712 24.869C211.842 25.2554 211.118 25.7868 210.538 26.463C209.959 27.0909 209.5 27.8396 209.162 28.7091C208.872 29.5302 208.654 30.3755 208.51 31.245Z" fill="white"/>
        <path d="M258.308 53.271C254.444 53.271 251.014 52.474 248.02 50.88C245.025 49.2377 242.658 47.0399 240.919 44.2867C239.18 41.4851 238.311 38.2972 238.311 34.7228C238.311 31.1484 239.18 27.9845 240.919 25.2313C242.658 22.4297 245.025 20.2078 248.02 18.5655C251.014 16.9232 254.444 16.1021 258.308 16.1021H263.887V25.5936H258.743C256.859 25.5936 255.241 26.0041 253.888 26.8253C252.536 27.5981 251.473 28.6849 250.7 30.0857C249.976 31.4382 249.614 32.9839 249.614 34.7228C249.614 36.4617 249.976 38.0315 250.7 39.4323C251.473 40.7848 252.536 41.8716 253.888 42.6927C255.241 43.4656 256.859 43.852 258.743 43.852H263.887V53.271H258.308Z" fill="white"/>
        <path d="M270.121 53.271V0.379578H281.351V18.5655C282.8 17.4063 284.394 16.561 286.133 16.0296C287.872 15.4983 289.611 15.2326 291.35 15.2326C294.731 15.2326 297.581 15.9572 299.899 17.4063C302.266 18.8553 304.029 20.8358 305.189 23.3475C306.396 25.8592 307 28.7091 307 31.8971V53.271H295.77V32.3318C295.77 30.931 295.431 29.6993 294.755 28.6366C294.127 27.5257 293.258 26.6562 292.147 26.0283C291.084 25.3521 289.901 25.0139 288.597 25.0139C287.292 25.0139 286.085 25.3279 284.974 25.9558C283.863 26.5838 282.969 27.4291 282.293 28.4917C281.665 29.5544 281.351 30.762 281.351 32.1144V53.271H270.121Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5884 52.7694C18.9158 52.5606 18.2575 52.3091 17.6133 52.015C15.4397 51.0007 13.6766 49.455 12.3242 47.378C11.02 45.301 10.3679 42.6926 10.3679 39.553V15.4982L0.00866699 15.4982V39.553C0.00866699 42.6926 0.660753 45.301 1.96493 47.378C3.3174 49.455 5.08045 51.0007 7.25407 52.015C9.47599 53.0294 11.867 53.5366 14.427 53.5366C16.2449 53.5366 17.9654 53.2808 19.5884 52.7694ZM21.5983 18.389C22.4867 17.5512 23.5016 16.8533 24.643 16.2952C26.865 15.1843 29.3525 14.6288 32.1058 14.6288C33.958 14.6288 35.6791 14.8802 37.269 15.383C36.485 15.6276 35.7294 15.9317 35.0023 16.2952C32.8287 17.3579 31.1139 18.9277 29.858 21.0047C28.6022 23.0817 27.9742 25.6176 27.9742 28.6124V41.002C27.9742 41.5817 27.8293 42.113 27.5395 42.596C27.2497 43.079 26.8633 43.4655 26.3803 43.7553C25.8972 44.0451 25.3659 44.19 24.7863 44.19C24.2066 44.19 23.6753 44.0451 23.1923 43.7553C22.7092 43.4655 22.3228 43.079 22.033 42.596C21.7432 42.113 21.5983 41.5817 21.5983 41.002V18.389ZM52.9725 18.4579C53.7455 19.1993 54.4212 20.0482 54.9996 21.0047C56.2555 23.0817 56.8834 25.6176 56.8834 28.6124V41.002C56.8834 41.5817 57.0283 42.113 57.3181 42.596C57.6079 43.079 57.9943 43.4655 58.4774 43.7553C59.0087 44.0451 59.5642 44.19 60.1438 44.19C60.7234 44.19 61.2548 44.0451 61.7378 43.7553C62.2208 43.4655 62.6073 43.079 62.8971 42.596C63.1869 42.113 63.3318 41.5817 63.3318 41.002V15.4982L52.9725 15.4982V18.4579ZM54.9459 52.7694C54.2734 52.5605 53.615 52.3091 52.9709 52.015C50.7972 51.0007 49.0342 49.455 47.6817 47.378C46.3293 45.301 45.653 42.6926 45.653 39.553V27.2358C45.653 26.6078 45.5081 26.0524 45.2183 25.5693C44.9285 25.0863 44.5421 24.6999 44.059 24.4101C43.576 24.1203 43.0447 23.9753 42.465 23.9753C41.8854 23.9753 41.3299 24.1203 40.7986 24.4101C40.3156 24.6999 39.9291 25.0863 39.6393 25.5693C39.3495 26.0524 39.2046 26.6078 39.2046 27.2358V39.553C39.2046 42.6354 38.5528 45.2057 37.2492 47.2639C37.2734 47.3021 37.2978 47.3401 37.3225 47.378C38.675 49.455 40.438 51.0007 42.6116 52.015C44.8335 53.0294 47.2245 53.5366 49.7846 53.5366C51.6024 53.5366 53.3229 53.2808 54.9459 52.7694Z" fill="#FFB629"/>
      </svg>
    </div>

    <div className="w-full lg:w-4/12 bg-white p-4 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mt-2 mb-6">Entrar</h1>
        <div className="mb-2 w-8/12">
          <label htmlFor="username" className="text-lg mb-6">Usuário</label>
          <div className="flex flex-col items-start">
            <input type="text" id="username" placeholder="Digite aqui seu usuario do GitHub" className="w-full p-2 border rounded mb-5" value={username}onChange={handleInputChange}/>
          </div>
        </div>
        <button type="submit" className="w-8/12 bg-blue-800 text-white p-2 rounded hover:bg-blue-600 focus:outline-none" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  </div>
);


  
};

export default SearchForm;