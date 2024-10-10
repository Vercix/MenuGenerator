
import menuItemStyles from "../styles/menuitem.module.css";


type Props = {
   item: IMenuItem;
}

interface IMenuItem {
   name: string;
   price: number;
   description: string;
}

export default function MenuItem({ item }: Props) {




   return (
      <div className={menuItemStyles.menuItemContainer}>
         <div className= {menuItemStyles.header}>
            
            <div>
               {item.name}
            </div>
            <hr className={menuItemStyles.menuItemDots} />
            <div>
               ${ Number(item.price).toFixed(2)}
            </div>
         </div>
         <p>{item.description}</p>
      </div>
   )

}