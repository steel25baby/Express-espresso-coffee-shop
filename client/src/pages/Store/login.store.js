import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore=create(
    persist(
        (set)=>({
            login: false,
            setLogin:(login)=>set({login})
        }),
        {
            name:"login-storage",   
        }
    )
)

export default useLoginStore;