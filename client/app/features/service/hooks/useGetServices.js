'use client'

import { getServices } from "@/app/services/serviceService";
import { useQuery } from "@tanstack/react-query";

export const useGetServices = () =>{
	return useQuery({
		queryKey: ["services"],
		queryFn: getServices,
	});
}