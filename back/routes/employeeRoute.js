import express from "express";
import { Employee } from "../models/employeeModel.js";


const router = express.Router();




//Route for add a new employee
router.post('/', async (request,response)=>{
    try{
        if(
            
            !request.body.firstName||
            !request.body.lastName||
            !request.body.nic||
            !request.body.role||
            !request.body.email||
            !request.body.gender||
            !request.body.dob||
            !request.body.address||
            !request.body.bankName||
            !request.body.bankAccountNum||
            !request.body.branch||
            !request.body.contactNumber||
            !request.body.qualifications||
            !request.body.workExperiance
        ){
            return response.status(400).send({
                message:'send all required field:firstName,lastName'
            });
        }

        const newEmployee = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            nic: request.body.nic,
            role: request.body.role,
            email: request.body.email,
            gender: request.body.gender,
            dob: request.body.dob,
            contactNumber: request.body.contactNumber,
            address: request.body.address,
            bankName: request.body.bankName,
            bankAccountNum: request.body.bankAccountNum,
            branch: request.body.branch,
            qualifications: request.body.qualifications,
            workExperiance: request.body.workExperiance,

        };

        const employee = await Employee.create(newEmployee);
        return response.status(201).send(employee)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }

})

//get all employees
router.get('/', async (request , response)=>{
    try{
        const employees = await Employee.find({});
        return response.status(200).json({
            count:employees.length,
            data:employees
        });

    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//get employee by id
router.get('/:id', async (request , response)=>{
    try{

        const {id} = request.params;

        const employee = await Employee.findById(id);

        return response.status(200).json({employee});

    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//update an employee
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.firstName||
            !request.body.lastName||
            !request.body.nic||
            !request.body.role||
            !request.body.email||
            !request.body.gender||
            !request.body.dob||
            !request.body.address||
            !request.body.bankName||
            !request.body.bankAccountNum||
            !request.body.branch||
            !request.body.contactNumber||
            !request.body.qualifications||
            !request.body.workExperiance
        ){
            return response.status(400).send({
                message:'send all required field:firstName,lastName'
            });
        }

        const {id} = request.params;

        const result =  await Employee.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'employee not found'});
        }
        else{
            return response.status(200).send({message:'employee details updated successfully'});
        }

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//delete an employee
router.delete('/:id', async (request,response)=>{
    try{

        const {id} = request.params;

        const result = await Employee.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'employee not found'});
        }
        else{
            return response.status(200).send({message:'employee details deleted successfully'});
        }
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})



export default router;