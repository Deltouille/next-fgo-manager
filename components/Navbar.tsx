import {Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
import authMiddleware from "@/middleware/checkAuth";
import Link from "next/link";
import {getUserData} from "@/lib/user";


export default function Navbar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar collapsedWidth="0px">
            <Menu>
                <MenuItem component={<Link href={"/profil"}/>}> Mon profil </MenuItem>
                <SubMenu label="Servants">
                    <MenuItem component={<Link href={"/servant/liste-des-servants"}/>}> Liste des servants </MenuItem>
                    <MenuItem component={<Link href={"/servant/mes-servants"}/>}> Ma collection de servants </MenuItem>
                </SubMenu>
                <SubMenu label="Craft Essences">
                    <MenuItem component={<Link href={"/craft-essences/liste-des-craft-essences"}/>}> Liste des CE </MenuItem>
                    <MenuItem component={<Link href={"/craft-essences/mes-craft-essences"}/>}> Ma collection de CE </MenuItem>
                </SubMenu>
                <MenuItem component={<Link href={"/mes-materiaux/"}/>}> Mes matériaux </MenuItem>
                <MenuItem> Histoire </MenuItem>
                <MenuItem> Events </MenuItem>
                <MenuItem> Servant Coins </MenuItem>
                <MenuItem> Gestionnaire </MenuItem>
                <MenuItem> Planificateur </MenuItem>
                <MenuItem> Statistiques globales </MenuItem>
            </Menu>
        </Sidebar>
    )
}