import React, { useContext } from 'react';
import { HashLoader } from 'react-spinners';
import { Context } from '../../../Store';

// component for registering user at first login to the system

const Loading: React.FC = () => {
    const [state] = useContext(Context);
    return (
        <div>
            <HashLoader loading={state.isLoading} />
        </div>
    );
};

export default Loading;
