import {Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import authMiddleware from "@/middleware/checkAuth";
import Link from "next/link";

export default function Navbar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar collapsedWidth="0px">
            <Menu>
                <MenuItem component={<Link href={"/profil"}/>}> Mon profil </MenuItem>
                <SubMenu label="Servants">
                    <MenuItem component={<Link href={"/servants/liste-des-servants"}/>}> Liste des servants </MenuItem>
                    <MenuItem component={<Link href={"/servants/mes-servants"}/>}> Ma collection de servants </MenuItem>
                </SubMenu>
                <SubMenu label="Craft Essences">
                    <MenuItem component={<Link href={"/craft-essences/liste-des-craft-essences"}/>}> Liste des CE </MenuItem>
                    <MenuItem component={<Link href={"/craft-essences/mes-craft-essences"}/>}> Ma collection de CE </MenuItem>
                </SubMenu>
                <MenuItem> Mes matériaux </MenuItem>
                <MenuItem> Gestionnaire </MenuItem>
                <MenuItem> Planificateur </MenuItem>
                <MenuItem> Statistiques globales </MenuItem>
            </Menu>
        </Sidebar>
    )
}