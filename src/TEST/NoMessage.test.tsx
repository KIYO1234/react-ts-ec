import React from "react";
import { render, screen } from "@testing-library/react";
import NoMessage from "../components/NoMessage";

describe('NoMessage', () => {
    it('should no message correctly', () => {
        const label:string = 'カートの中身はありません'
        render(<NoMessage label={label}/>);
        expect(screen.getByText('カートの中身はありません')).toBeTruthy();
    })
})