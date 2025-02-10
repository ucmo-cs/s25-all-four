import React, { useRef, useState } from 'react';
import './css/OfferItem.css';

const OfferItem: React.FC = () => {
    const [subtitle_1] = useState<string[]>(['Role-Based Access', 'Task Posting & Assignment', 'Time Shift Logging'])
    const [subtitle_2] = useState<string[]>(['Interactive Flight Maps', 'Customizable Views', 'Role-Specific Features'])
    const [subtitle_3] = useState<string[]>(['Unified Interface', 'Customization Options'])

    const [text_1] = useState<string[]>(['Our platform features a sophisticated role-based system where Admins can post tasks, assign responsibilities, and monitor progress, while Users can engage in open conversations, share insights, and log their time shifts efficiently.','Admins have the tools to create detailed tasks, set deadlines, and assign them to team members, ensuring clarity and accountability within the team.','Users can easily add and track their time shifts, providing transparency and facilitating effective resource management.'])
    const [text_2] = useState<string[]>(['Access dynamic and detailed airplane maps powered by reliable APIs, offering up-to-the-minute information on flight statuses, routes, altitudes, and more.','Tailor the map interface to display the data most relevant to your operations, whether its tracking specific flights, monitoring airspace, or analyzing flight patterns.','Just like our communication tools, our mapping features support distinct user and admin roles, allowing for tailored access and management based on user responsibilities.'])
    const [text_3] = useState<string[]>(['Navigate all your tools and information from a single, intuitive dashboard that provides quick access to communication channels, task lists, and real-time flight data.','Personalize your dashboard to prioritize the information and tools that matter most to you, enhancing productivity and user experience.'])

    const [index_1, setIndex_1] = useState<number>(0)
    const [index_2, setIndex_2] = useState<number>(0)
    const [index_3, setIndex_3] = useState<number>(0)

    const SubtitleRef_1 = useRef<HTMLHeadingElement>(null)
    const SubtitleRef_2 = useRef<HTMLHeadingElement>(null)
    const SubtitleRef_3 = useRef<HTMLHeadingElement>(null)    

    function changeSubtitle_1(index: number): void{
        const itemsContainerH4 = document.querySelectorAll('.ItemDescription h4') as NodeListOf<HTMLDivElement>
        const itemsContainerP = document.querySelectorAll('.ItemDescription p') as NodeListOf<HTMLDivElement>
        const buttons = document.querySelectorAll('.BWM_1') as NodeListOf<HTMLButtonElement>

        itemsContainerP[0].style.color = 'white'        
        itemsContainerH4[0].style.width = '0%'
        itemsContainerH4[0].style.height = '0%'
        
        if(index !== index_1){
            buttons[index_1].style.backgroundColor = 'gray'
            buttons[index].style.backgroundColor = 'yellow'
        } else {
            buttons[index].style.backgroundColor = 'yellow'
        }        
        setTimeout(() => {        
            itemsContainerP[0].style.color = 'black'        
            itemsContainerH4[0].style.width = '80%'
            itemsContainerH4[0].style.height = '5%'
        }, 500);
        
        setTimeout(() => {            
            setIndex_1(index)
        }, 550);
    }
    function changeSubtitle_2(index: number): void{
        const itemsContainerH4 = document.querySelectorAll('.ItemDescription h4') as NodeListOf<HTMLDivElement>
        const buttons = document.querySelectorAll('.BWM_2') as NodeListOf<HTMLButtonElement>
        const itemsContainerP = document.querySelectorAll('.ItemDescription p') as NodeListOf<HTMLDivElement>

        itemsContainerH4[1].style.width = '0%'
        itemsContainerH4[1].style.height = '0%'
        itemsContainerP[1].style.color = 'white'        

        if(index !== index_2){
            buttons[index_2].style.backgroundColor = 'gray'
            buttons[index].style.backgroundColor = 'yellow'
        } else {
            buttons[index].style.backgroundColor = 'yellow'
        }
        setTimeout(() => {        
            itemsContainerH4[1].style.width = '80%'
            itemsContainerH4[1].style.height = '5%'
            itemsContainerP[1].style.color = 'black'        
        }, 500);
        
        setTimeout(() => {            
            setIndex_2(index)
        }, 550);
    }
    function changeSubtitle_3(index: number): void{
        const itemsContainerH4 = document.querySelectorAll('.ItemDescription h4') as NodeListOf<HTMLDivElement>
        const buttons = document.querySelectorAll('.BWM_3') as NodeListOf<HTMLButtonElement>
        const itemsContainerP = document.querySelectorAll('.ItemDescription p') as NodeListOf<HTMLDivElement>

        itemsContainerH4[2].style.width = '0%'
        itemsContainerH4[2].style.height = '0%'
        itemsContainerP[2].style.color = 'white'        


        if(index !== index_3){
            buttons[index_3].style.backgroundColor = 'gray'
            buttons[index].style.backgroundColor = 'yellow'
        } else {
            buttons[index].style.backgroundColor = 'yellow'
        }
        
        setTimeout(() => {        
            itemsContainerH4[2].style.width = '80%'
            itemsContainerH4[2].style.height = '5%'
            itemsContainerP[2].style.color = 'black'        
        }, 500);
        
        setTimeout(() => {                        
            setIndex_3(index)
        }, 550);
    }
    
  return (
    <article className='OfferItems'>  
        <div className='Itemcontinaer'>
            <h3 style={{fontSize: '0.95em'}}>Advanced Communication & Task Management</h3>
            <div className='ItemDescription'>
                <h4 ref={SubtitleRef_1}>{subtitle_1[index_1]}</h4>
                <p>
                    {text_1[index_1]}
                </p>
            </div>
                <div className='Buttons'>
                    <button className='BWM_1' style={{backgroundColor: "yellow"}} onClick={() => changeSubtitle_1(0)}></button>
                    <button className='BWM_1'  style={{backgroundColor: "gray"}} onClick={() => changeSubtitle_1(1)}></button>
                    <button className='BWM_1'  style={{backgroundColor: "gray"}} onClick={() => changeSubtitle_1(2)}></button>
                </div>
        </div>                   
        <div className='Itemcontinaer'>
            <h3>Real-Time Airplane Mapping</h3>
            <div className='ItemDescription'>
                <h4 ref={SubtitleRef_2}>{subtitle_2[index_2]}</h4>
                <p>
                    {text_2[index_2]}
                </p>
            </div>
                <div className='Buttons'>
                    <button className='BWM_2'  style={{backgroundColor: "yellow"}} onClick={() => changeSubtitle_2(0)}></button>
                    <button className='BWM_2'  style={{backgroundColor: "gray"}} onClick={() => changeSubtitle_2(1)}></button>
                    <button className='BWM_2'  style={{backgroundColor: "gray"}} onClick={() => changeSubtitle_2(2)}></button>
                </div>
        </div>                   
        <div className='Itemcontinaer'>
            <h3>Comprehensive Dashboard</h3>
            <div className='ItemDescription'>
                <h4 ref={SubtitleRef_3}>{subtitle_3[index_3]}</h4>
                <p>
                {text_3[index_3]}
                </p>
            </div>
                <div className='Buttons'>
                    <button className='BWM_3'  style={{backgroundColor: "yellow"}} onClick={() => changeSubtitle_3(0)}></button>
                    <button className='BWM_3'  style={{backgroundColor: "gray"}} onClick={() => changeSubtitle_3(1)}></button>
                </div>
        </div>                   
    </article>
  );
}

export default OfferItem;