import {create} from "zustand"
import {devtools, persist} from "zustand/middleware"

const customerStore = (set) => ({
    customer: null,
    changeCustomerInformation: (newCustomerObject)=>{
        set(()=>({customer:newCustomerObject}));
    },
    clearCustomerInformation:(()=>{
        set(()=>({customer:null}));
    })
})

const useCustomerStore=create(
    devtools(persist(customerStore, {name:"espresso"}))
)

export default useCustomerStore;