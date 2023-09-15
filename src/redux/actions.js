import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../helpers/constants";
import axios from "axios";

export const getFlights = createAsyncThunk("getFlights", async()=>{
    const res = await axios.request(options);
    const newFlights = res.data.aircraft.map((flight)=> ({
        id:flight[0],
        code:flight[1],
        lat: flight[2],
        lng :flight[3],
        tail:flight[14],
        tailNumber:flight[17]
    }));

return newFlights;

});