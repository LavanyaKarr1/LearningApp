import axios from "axios"
import ApiUrls from "../API-urls/api-urls"
import commonAxios from "../axios/CommonAxios";
import { useState } from "react";
import Swal from "sweetalert2";


    

      export const getDistricts =async() =>{
    
        const districtsResponse =await commonAxios.get(ApiUrls.contextURL+'getDistricts');
        if(districtsResponse.data.success === true){
            return districtsResponse.data.Data;
        }
    }
    
    
   
    export const getMandals =async() =>{
        
        const mandalsResponse =await commonAxios.get(ApiUrls.contextURL+'getMandals');
        if(mandalsResponse.data.success === true){
            return mandalsResponse.data.Data ;
        }
    }
    
    
    export const getVillages =async() =>{
        const villagesResponse=await commonAxios.get(ApiUrls.contextURL+'getVillages');
        if(villagesResponse.data.success === true){
            return villagesResponse.data.Data ;
        }
    }


    