
import { useState } from "react";

import styles from "../styles/newitemform.module.css";
import Grid from '@mui/material/Grid2';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

type Props = {
   onClick(newItem: IMenuItem): void;
}

interface IMenuItem {
   [key: string]: any;
   name: string;
   description: string;
   price: number;
}


export default function NewMenuItemForm({ onClick }: Props) {

   const [newMenuItem, setNewMenuItem] = useState<IMenuItem>({
      name: "",
      description: "",
      price: 0.0,
   })


   function handleNewMenuItemStateChange(value: string | number, id: keyof IMenuItem) {
      setNewMenuItem({
         ...newMenuItem,
         [id]: value
      })
   }

   function handleAddMenuItemClick() {
      // setNewMenuItem({
      //    name: "",
      //    description : "",
      //    price: 0.0,
      // })

      onClick(newMenuItem)
   }

   return (
      <div className={styles.main}>
         <Grid container sx={{paddingTop:2}} spacing={2} columns={16} >
            <Grid size={{xs : 8, md : 4}}>
               <TextField
                  required
                  label="Name"
                  type="string"
                  placeholder={"Name"}
                  value={newMenuItem.name}
                  onChange={e => handleNewMenuItemStateChange(e.target.value, 'name')}
                  slotProps={{
                     inputLabel: {
                        shrink: true,
                     },
                  }}
               />
            </Grid>
            <Grid size={{xs : 8, md : 4}}>
               <label>
                  <TextField
                     label="Price"
                     type="number"
                     placeholder={"0.00"}
                     value={newMenuItem.price}
                     onChange={e => handleNewMenuItemStateChange(e.target.value, 'price')}
                     slotProps={{
                        inputLabel: {
                           shrink: true,
                        },
                     }}
                  />
               </label>
            </Grid>
            <Grid size={{xs : 16, md : 8}}>
                  <TextField
                     required
                     label="Description"
                     placeholder={"Description"}
                     value={newMenuItem.description}
                     onChange={e => handleNewMenuItemStateChange(e.target.value, 'description')}
                     multiline
                     rows={5}
                     sx={{width:'100%'}}
                     slotProps={{
                        inputLabel: {
                           shrink: true,
                        },
                     }}
                  />
            </Grid>

            <Grid size={{xs : 16, md : 8}}>
               <Button variant="contained"  onClick={handleAddMenuItemClick}>Add Item</Button>
            </Grid>
         </Grid>
      </div>
   )

}
