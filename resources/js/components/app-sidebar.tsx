import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, ShoppingCart, DollarSign } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Purchase',
        href: '/purchase/list',
        icon: ShoppingCart,
    },
    {
        title: 'Sale',
        href: '/sale/list',
        icon: DollarSign,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Business</SidebarGroupLabel>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Purchase List' }}>
                                <Link href="/purchase/list" prefetch>
                                    <ShoppingCart />
                                    <span>Purchase List</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Make Purchase' }}>
                                <Link href="/purchase/create" prefetch>
                                    <ShoppingCart />
                                    <span>Make Purchase</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'View Purchase (example)' }}>
                                <Link href="/purchase/1" prefetch>
                                    <ShoppingCart />
                                    <span>View Purchase</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Purchase Status' }}>
                                <Link href="/purchase/status" prefetch>
                                    <ShoppingCart />
                                    <span>Purchase Status</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Purchase Requests' }}>
                                <Link href="/purchase/requests" prefetch>
                                    <ShoppingCart />
                                    <span>Purchase Requests</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Purchase Filters' }}>
                                <Link href="/purchase/filters" prefetch>
                                    <ShoppingCart />
                                    <span>Purchase Filters</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    <div className="mt-4" />

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Sale List' }}>
                                <Link href="/sale/list" prefetch>
                                    <DollarSign />
                                    <span>Sale List</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Make Sale' }}>
                                <Link href="/sale/create" prefetch>
                                    <DollarSign />
                                    <span>Make Sale</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'View Sale (example)' }}>
                                <Link href="/sale/1" prefetch>
                                    <DollarSign />
                                    <span>View Sale</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Sale Status' }}>
                                <Link href="/sale/status" prefetch>
                                    <DollarSign />
                                    <span>Sale Status</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Sale Requests' }}>
                                <Link href="/sale/requests" prefetch>
                                    <DollarSign />
                                    <span>Sale Requests</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Sale Filters' }}>
                                <Link href="/sale/filters" prefetch>
                                    <DollarSign />
                                    <span>Sale Filters</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroup className="px-2 py-0 group-data-[collapsible=icon]:hidden">
                    <AppearanceToggleTab className="w-full" />
                </SidebarGroup>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
