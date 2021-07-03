import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe('Loading Message', () => {
    it('should display loading message', () => {
        render(<Loading />)
        expect(screen.getByText('Loading...')).toBeTruthy();
    })
})