import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const ERR = styled.div`
    color: #1E7945;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #fff 0%, #99f6e4 100%);
    font-size: 24px;
    .big {
        letter-spacing: 5px;
        font-size: 72px;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .error-text {
        font-size: 24px;
        margin-bottom: 2rem;
    }

    a {
        display: flex;
        align-items: center;
        padding: 0.5rem 1.5rem;
        background-color: #1E7945;
        color: white;
        border-radius: 30px;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #145c32;
        }

        svg {
            margin-left: 0.5rem;
        }
    }
`;

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <ERR>
            <div className="big">404</div>
            <div className="error-text">error</div>
            <Link to="/">
                back to <span style={{ marginLeft: '0.5rem' }}>home</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
            </Link>
        </ERR>
    );
}
