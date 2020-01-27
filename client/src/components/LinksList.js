import React from 'react'
import {Link} from "react-router-dom"

const LinksList = ({links}) => {
    if (!links.length) {
        return <p>No links yet!</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Number</th>
                <th>Original link</th>
                <th>Shortened link</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {
                links.map((link,i) => (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                    )
                )
            }
            </tbody>
        </table>
    );
};

export default LinksList;