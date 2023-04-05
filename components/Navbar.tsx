import {Sidebar, Menu, MenuItem, SubMenu, useProSidebar} from 'react-pro-sidebar';
export default function Navbar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar collapsedWidth="0px">
            <Menu>
                <MenuItem> Mon profil </MenuItem>
                <SubMenu label="Servants">
                    <MenuItem> Liste des servants </MenuItem>
                    <MenuItem> Ma collection de servants </MenuItem>
                </SubMenu>
                <SubMenu label="Craft Essences">
                    <MenuItem> Liste des CE </MenuItem>
                    <MenuItem> Ma collection de CE </MenuItem>
                </SubMenu>
                <MenuItem> Mes matériaux </MenuItem>
                <MenuItem> Gestionnaire </MenuItem>
                <MenuItem> Planificateur </MenuItem>
                <MenuItem> Statistiques globales </MenuItem>
            </Menu>
        </Sidebar>
    )
}