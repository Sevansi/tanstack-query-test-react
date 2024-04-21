import { useEffect, useState } from "react";
import { useQueryGetTest1, useQueryGetTest2, useQueryGetTest3 } from "./query";
import { useNavigate, useLocation } from 'react-router-dom';

export default function App() {
	const { data: data2 } = useQueryGetTest2();

	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const isOpenFromURL = params.get('modal') === 'open';
		setIsOpen(isOpenFromURL);
	}, [location.search]);

	const closeModal = () => {
		const params = new URLSearchParams(location.search);
		params.delete('modal');
		navigate({ search: params.toString() });
		setIsOpen(false);
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-24">

			<button onClick={() => {
				const params = new URLSearchParams(location.search);
				params.set('modal', 'open');
				navigate({ search: params.toString() });
				setIsOpen(!isOpen);
			}}>Open modal</button>
			{isOpen &&
				<Block closeModal={closeModal} />
			}
		</main>
	);
}

const Block = ({ closeModal }) => {
	const { data: data1, isLoading } = useQueryGetTest1(21);

	const { mutateAsync } = useQueryGetTest3();

	return (
		<div className="bg-red-500 w-1/2 h-1/2 flex flex-col gap-4">
			Hi {data1?.data}
			{isLoading && <div>Loading...</div>}
			<button onClick={async () => {
				await mutateAsync();
				closeModal();
			}}>Click me</button>
		</div>
	);
}
