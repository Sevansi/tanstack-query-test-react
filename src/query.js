import {
	useQuery,
	useMutation,
	useQueryClient,
	MutateFunction,
	MutationFunction,
	keepPreviousData,
} from "@tanstack/react-query";
import { test1, test2, test3 } from "./server";

export const useQueryGetTest1 = (id) => {
	return useQuery({
		queryKey: [`getCategoriesById-${id}`],
		queryFn: async () => await test1(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
};

export const useQueryGetTest2 = () => {
	return useQuery({
		queryKey: [`getAllCategories`],
		queryFn: async () => await test2(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
};

export const useQueryGetTest3 = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => await test3(),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
			queryClient.invalidateQueries({ queryKey: [`getCategoriesById-${21}`] });
		},
	});
};
