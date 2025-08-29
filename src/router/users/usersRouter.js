import { Router } from "express";
import { 
    getUsers, 
    getUser, 
    checkUserExistence, 
    checkEmailRegistration, 
    postUser, 
    putUser, 
    getUserContacts, 
    deleteUser 
} from '../../controller/usersController.js'

const usersRouter = Router();

// Get all users
usersRouter.get('/', getUsers);

// Get user by id
usersRouter.get('/:id', getUser);

// Check if user exists
usersRouter.get('/:id/exists', checkUserExistence);

// Get user social contacts
usersRouter.get('/:id/contacts', getUserContacts);

// Check if email is registered
usersRouter.post('/check-email', checkEmailRegistration);

// Create user
usersRouter.post('/', postUser);

// Update user (name, city, email, birthdate)
usersRouter.put('/:id', putUser);

// Delete user
usersRouter.delete('/:id', deleteUser);

export default usersRouter;