import React from 'react';
import "@radix-ui/themes/styles.css";
import {Box,Tabs,Text} from "@radix-ui/themes";
import Notes from "./Notes";



export default function Navigation() {
    return(

        <Tabs.Root defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger  value="account"><p className={'font-poppins font-semibold'}>All notes</p></Tabs.Trigger>

            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="account">
                    <Notes/>
                </Tabs.Content>




            </Box>
        </Tabs.Root>


    );
}