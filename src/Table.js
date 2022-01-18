import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

export default function Table({ rows, title }) {
    return (
        <List
            sx={{
                paddingTop: '50px',
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {rows.length !== 0 ? <span style={{marginRight: '80%'}}>{title}</span> : null}
            {rows.map((array) => (
                <li>
                    <ul>
                        <ListSubheader className='listStyle'>
                            {`${array}`}
                        </ListSubheader>

                    </ul>
                </li>
            ))}
        </List>
    );
}