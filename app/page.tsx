'use client';

import Image from "next/image";
import styles from "../styles/page.module.css";
import menuStyles from "../styles/menu.module.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import NewMenuItemForm from "@/components/NewMenuItemForm";
import MenuItem from "@/components/MenuItem";

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

interface IMenuItem {
   name: string;
   price: number;
   description: string;
}

export default function Page() {

   function onGeneratePDFClicked() {
      console.log('HELLO')
      // Default export is a4 paper, portrait, using millimeters for units


      let divContents = document.querySelector('#pdfContent') as HTMLElement;
      let contentHeight: number = divContents.offsetHeight
      let contentWidth: number = divContents.offsetWidth
      divContents.style.position = 'absolute';
      divContents.style.top = '0';
      divContents.style.left = '0';

      let doc = new jsPDF('p', 'mm', 'a4');

      html2canvas(
         divContents,
         {
            scale: 1.0,
            // width: contentWidth,
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0,
            backgroundColor: '#1b1b1b'

         },

      ).then(
         function (canvas) {
            divContents.style.position = 'unset';
            var image = canvas.toDataURL("image/png", 1.0)
            var image_element = document.createElement("img");
            image_element.src = image;
            // divContents.appendChild(canvas)
            var heightAspectRatio: number = canvas.height / canvas.width;
            doc.addImage({
               imageData: canvas,
               format: 'PNG',
               x: 0,
               y: 0,
               width: 210,
               height: 210 * heightAspectRatio
            })

            doc.save('menu.pdf')
         }
      )
   }

   const [menuHeader, setMenuHeader] = useState<String>("Menu")

   const [menuItems, setMenuItems] = useState<Array<IMenuItem>>([])

   function handleNewMenuItemClick(newMenuItem: IMenuItem) {
      setMenuItems(
         [
            newMenuItem,
            ...menuItems
         ]
      )
   }


   function removeItem(index: number) {
      if (index >= 0 && index < menuItems.length) {
         menuItems.splice(index, 1)
         setMenuItems(
            [
               ...menuItems
            ]
         )
      }
   }

   function handleMenuHeaderChange(newValue : String){
      setMenuHeader(newValue)
   }

   return (

      <Container maxWidth="lg">
         <main className={styles.main}>
            <Typography gutterBottom variant="h3">Menu Generation App:</Typography>
            <hr />
            <br />
            <br />
            <br />
            <Typography gutterBottom variant="h4">Menu Header:</Typography>
            <br />
            <TextField
               required
               label="Menu Header"
               type="string"
               placeholder={"Menu"}
               value={menuHeader}
               onChange={e => handleMenuHeaderChange(e.target.value)}
               slotProps={{
                  inputLabel: {
                     shrink: true,
                  },
               }}
            />

            <br />
            <br />
            <Typography gutterBottom variant="h4">New Item:</Typography>
            <NewMenuItemForm onClick={(newItem: IMenuItem) => { handleNewMenuItemClick(newItem) }} />



            <br />
            <Typography gutterBottom variant="h4">Current Items:</Typography>

            <Box sx={{ flexGrow: 1 }}>
               <Grid container spacing={1} columns={1}>
                  <Grid container spacing={1} columns={16} size={4}>
                     <Grid size={{ xs: 8, md: 4 }}>
                        <Typography variant="overline">name</Typography>
                     </Grid>
                     <Grid size={{ xs: 8, md: 2 }}>
                        <Typography variant="overline">price</Typography>
                     </Grid>
                     <Grid size={{ xs: 8, md: 8 }}>
                        <Typography variant="overline">description</Typography>
                     </Grid>
                  </Grid>
                  <Grid size={4}>
                     <hr />
                  </Grid>
                  {
                     menuItems.map((item: IMenuItem, index: number) => (
                        <Grid key={index} size={4}>
                           <Box >
                              <Paper sx={{ padding: 1 }} variant="outlined">
                                 <Grid container spacing={1} columns={16}>
                                    <Grid size={{ xs: 8, md: 4 }} >
                                       <Typography>
                                          {item.name}
                                       </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 8, md: 2 }}>
                                       <Typography>
                                          ${ Number(item.price).toFixed(2)}
                                       </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 16, md: 8 }} >
                                       <Typography >
                                          {item.description}
                                       </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 8, md: 2 }}>
                                       <Button onClick={() => removeItem(index)}>Remove</Button>
                                    </Grid>
                                 </Grid>
                              </Paper>
                           </Box >
                        </Grid>
                     ))
                  }
               </Grid>
            </Box>
            <br />
            <Typography gutterBottom variant="h4">Generate PDF:</Typography>
            <Button variant="contained" onClick={() => onGeneratePDFClicked()}>Genertate pdf</Button>

            <br />
            <br />
            <Typography gutterBottom variant="h4">Preview:</Typography>
            <Box overflow="scroll" maxWidth="md">
               <Paper sx={{ padding: 1, height: '100%', }} variant="outlined">

                  <div className={menuStyles.mainPDFContent} id="pdfContent">
                     <div className={menuStyles.container}>

                        <div className={menuStyles.outterBorder}>
                           <div className={menuStyles.borderWoodAffix}>
                              <div className={`${menuStyles.borderWoodCorner} ${menuStyles.borderWoodCornerTL}`} />
                              <div className={menuStyles.borderWood} />
                              <div className={`${menuStyles.borderWoodCorner} ${menuStyles.borderWoodCornerTR}`} />
                           </div>
                           <div className={menuStyles.centerBody}>

                              <div className={menuStyles.borderWoodVertical} />
                              <div className={menuStyles.menuMain}>
                                 <div className={menuStyles.menuHeader}>
                                    {menuHeader}
                                 </div>
                                 <div className={menuStyles.borderAffix}>
                                    <div className={menuStyles.borderCorner} />
                                    <div className={menuStyles.border} />
                                    <div style={{ transform: 'rotate(90deg)' }} className={menuStyles.borderCorner} />
                                 </div>
                                 <div className={menuStyles.centerBody}>

                                    <div className={menuStyles.borderVertical} />
                                    <div className={menuStyles.styledPDFDiv}>
                                       {
                                          menuItems.map((item: IMenuItem, index: number) => (
                                             <MenuItem key={index} item={item} />
                                          ))
                                       }
                                    </div>
                                    <div className={menuStyles.borderVertical} />
                                 </div>
                                 <div style={{ alignItems: 'end' }} className={menuStyles.borderAffix}>
                                    <div style={{ transform: 'rotate(-90deg)' }} className={menuStyles.borderCorner} />
                                    <div className={menuStyles.border} />
                                    <div style={{ transform: 'rotate(180deg)' }} className={menuStyles.borderCorner} />
                                 </div>
                              </div>
                              <div className={menuStyles.borderWoodVertical} />
                           </div>

                           <div className={menuStyles.borderWoodAffix}>
                              <div className={`${menuStyles.borderWoodCorner} ${menuStyles.borderWoodCornerBL}`} />
                              <div className={menuStyles.borderWood} />
                              <div className={`${menuStyles.borderWoodCorner} ${menuStyles.borderWoodCornerBR}`} />
                           </div>

                        </div>

                     </div>

                  </div>
               </Paper>
            </Box>
         </main>
      </Container>
   )
}