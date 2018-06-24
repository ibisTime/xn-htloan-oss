import React from 'react';
import './home.css';
import userPhoto from '../../images/home-userPhoto.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="home-wrap">
                <div className="top-wrap">
                    <div className="card user-wrap">
                        <div className="card-top">
                            <div className="photo">
                                <img src={userPhoto}/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="user-name"></div>
                            <div className="user-lever"></div>
                        </div>
                    </div>
                    <div className="card top-right notice-wrap">
                        <div className="card-top"></div>
                        <div className="card-content"></div>
                    </div>
                </div>
                <div className="below-wrap">
                    <div className="card companysystem-wrap">
                        <div className="card-top"></div>
                        <div className="card-content"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
