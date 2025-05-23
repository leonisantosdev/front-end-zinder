import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { getUserDatas } from '@/api/services/user.service';
import { getTokenClient } from '@/utils/getTokenClient';
import { UserDataProfile } from '@/api/types/user';
import { useNavigate } from 'react-router-dom';

export function NavUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataProfile | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const token = getTokenClient();

      if (!token) throw new Error('Usuário não autenticado.');

      try {
        const response = await getUserDatas('/user/profile', token);
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário', error);
      }
    };

    getUser();
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={'user.avatar'} alt={'user.name'} />
                <AvatarFallback className="rounded-lg">ZN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profilePictureUrl || ''}
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">ZN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:cursor-pointer">
                <IconUserCircle />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="hover:cursor-pointer">
              <IconLogout />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
