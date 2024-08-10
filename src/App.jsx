import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import LanguageSelector from './helper/LanguageSelector';
import { useTranslation } from 'react-i18next';

function App() {
	const { t } = useTranslation();
	return (
		<>
			<div className="bg-dark py-2 shadow-lg">
				<div className="d-flex justify-content-between mx-4 align-items-center">
					<h2 className='text-white'>{t("Multi Lingual Blogs")}</h2>
					<div className="w-auto">
						<LanguageSelector />
					</div>
				</div>
			</div>
			<Routes>
				<Route path='/' element={<Blogs />} />
				<Route path='/create' element={<CreateBlog />} />
				<Route path='/blog/:id' element={<BlogDetail />} />
				<Route path='/blog/edit/:id' element={<EditBlog />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
