import React, { useEffect, useRef, useState } from 'react';
import './ProfilePic.scss';
import defaultUser from '../../src/user.svg';


const Settings: React.FC= () => {
    const profileRef = useRef<HTMLDivElement>(null);
    const [image,setImage] = useState('');
    const [dropping,setDropping] = useState(false);

    useEffect(()=>{
            let dropArea = profileRef.current;
            if(dropArea){
                dropArea.addEventListener('dragenter', (e)=>{
                    // console.log('dragenter');
                    handlerFunction(e);
                    // setDropping(true);
                }, false);
                dropArea.addEventListener('dragleave', (e)=>{
                    // console.log('dragleave');
                    handlerFunction(e);
                    // setDropping(false);
                }, false);
                dropArea.addEventListener('dragover', (e)=>{
                    // console.log('dragover');
                    handlerFunction(e);
                    setDropping(true);
                }, false);
                dropArea.addEventListener('drop', 
                (e)=>{
                    // console.log('drop');
                    setDropping(false);
                    handlerFunction(e)
                    handleDrop(e);
                }, false);
            }
        },[]);

    function handlerFunction(e:any){
        e.preventDefault()
        e.stopPropagation()
    }
    function handleDrop(e:any) {
        let dt = e.dataTransfer;
        var oFReader = new FileReader();
        oFReader.readAsDataURL(dt.files[0]);

        oFReader.onload = function (oFREvent) {
            if(oFREvent.target?.result){
                let result:any = oFREvent.target.result;
                setImage(result);
            }
        };
    }

    function inputHandler(e:any){
        var oFReader = new FileReader();
        oFReader.readAsDataURL(e.target.files[0]);

        oFReader.onload = function (oFREvent) {
            if(oFREvent.target?.result){
                let result:any = oFREvent.target.result;
                setImage(result);
            }
        };
    }


    return (
        <div className="settings">
            <div className="profile-pic-section" ref={profileRef}>
                <div className="main-image">
                    {
                        image?
                        <img 
                            src={image}
                            alt="User"
                            width="150"
                            height="150"
                            style={{borderRadius: '50%', background: '#ffffff'}}
                        />:
                        <img
                            src={defaultUser}
                            alt="User"
                            width="150"
                            height="150"
                            style={{borderRadius: '50%', background: '#ffffff'}}
                            onError={(e) => {
                                e.currentTarget.src = defaultUser
                        }}/>

                    }

                    <div className="overlay"></div>
                    <label htmlFor="profile_pic">+</label>
                    <input type="file" id="profile_pic" name="profile_pic"
                        accept=".jpg, .jpeg, .png"
                        onInput={(e)=>inputHandler(e)}
                        />

                    {
                        dropping?
                            <div className="drop-section">

                            </div>
                        :null

                    }
                </div>
            </div>
        </div>
    );
};

export default Settings;
