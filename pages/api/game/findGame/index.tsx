import { createBreakpoints } from "@mui/system";
import { request } from "https";
import type { NextApiRequest, NextApiResponse } from "next";
import {v4 as uuidv4} from 'uuid';
class UserRequest {

    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

let reqList: UserRequest[] = [];
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    //TODO: create the endpoint for the request

    if(req.method === "POST"){
        //Append the request to the list
        if(req.body.accessWaitingList && req.body.waitingList){

            let id = uuidv4();

            const request = new UserRequest(id, req.body.name);

            reqList.push(request);
            
            
            console.log(reqList);

            res.status(200).json({
                message: "Request added to the waiting list",
                status : true,
                data : req.body,
                id : id
            });
            
        }
        
        //Remove the request from the list
        else if(!req.body.accessWaitingList && req.body.waitingList){
            
            //TODO : finire di rimuovere la richista dalla lista
            const index = reqList.findIndex(x => x.id === req.body.id);
            
            if(index !== -1){
                reqList.splice(index, 1);
            }


            console.log(reqList);

            res.status(200).json({
                message: "Request removed successfully",
                status : true,
                data : req.body
            });
        }


        //Wait to find a new player
        if(!req.body.waitingList){
            //TODO: create the algorithm to find a new player
            res.status(200).json({
                message: "Waiting for a new player",
                status : true,
                data : req.body
            });
        
        }
        

        
    }

}