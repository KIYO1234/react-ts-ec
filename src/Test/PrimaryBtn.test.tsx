import React from "react";
import { render, screen } from "@testing-library/react";
import PrimaryBtn from "../components/PrimaryBtn";

// PrimaryBtn があるかのテスト
describe('PrimaryBtn', () => {
    it('PrimaryBtn exsists', () => {
        render(<PrimaryBtn label='テスト'/>);
        expect(screen.getByRole('button')).toBeTruthy();
    })
})