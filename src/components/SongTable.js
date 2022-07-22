import React, { useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid';

function SongTable(props)
{
    const columns = [
        {field: 'id', headerName: 'Rank', description: '', width: 75, type: 'number', align: 'center', headerAlign: 'center'},
        {field: 'title', headerName: 'Title', description: '', width: 300, headerAlign: 'center'},
        {field: 'artist', headerName: 'Artist(s)', description: '', width: 200, headerAlign: 'center'},
        {field: 'danceability', headerName: 'Danceability', description: 'How suitable for dancing based on tempo, rhythm stability, beat strength, and overall regularity', width: 120, type: 'number', align: 'center', headerAlign: 'center'},
        {field: 'energy', headerName: 'Energy', description: 'Perceptual measure of intesity and activity', width: 120, type: 'number', align: 'center', headerAlign: 'center'},
        {field: 'valence', headerName: 'Valence', description: 'Musical positiveness. High valence tracks sound positive (happy, cheerful, euphoric), while low valence tracks sound negative (sad, depressed, angry)', width: 120, type: 'number', align: 'center', headerAlign: 'center'},
    ];

    const rows = props.songs.map((song, key) => {
        return {
            id:key+1,
            title:song.name,
            artist:song.artists.map((artist, key) => artist.name).join(', '),
            danceability:props.audioData[key].danceability,
            energy:props.audioData[key].energy,
            valence:props.audioData[key].valence,
        }
    });
    
    return (
        <div style={{ height: '500px', width: '95%' }}>
            <DataGrid rows={rows} columns={columns}/>
        </div>
    )
}

export default SongTable;