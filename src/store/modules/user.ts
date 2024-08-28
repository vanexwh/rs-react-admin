import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUser {
	id: string;
	token: string;
	name: string;
	setName: (id: string) => void;
	setToken: (token: string) => void;
}

const useStoreUser = create<IUser>()(
	persist(
		(set) => ({
			id: 'vanexwh@163.com',
			token: '',
			name: 'vanexwh@163.com',
			setName: (name: string) =>
				set(() => ({
					name,
				})),
			setToken: (token: string) => set(() => ({ token })),
		}),
		{
			//unique key
			name: 'user',
			storage: createJSONStorage(() => sessionStorage),
			// Setting not displayed fields
			partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['id','token'].includes(key))),
			version: 1.0,
		},
	),
);

export default useStoreUser;
