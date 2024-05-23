import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query Categories {
        diverses {
            instrument
            id
            amount
        }
        strijkers {
            amount
            id
            instrument
        }
        houtblazers {
            id
            instrument
            amount
        }
        koperblazers {
            id
            instrument
            amount
        }
    }
`;
