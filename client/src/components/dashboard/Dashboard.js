import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profilesAction'
import Spinner from '../common/Spinner'
import {Card,Row,Col,Container} from 'react-bootstrap'
import cities from '../common/cities'
import { Link } from 'react-router-dom'
class Dashboard extends Component {
    
    componentDidMount(){

        this.props.getCurrentProfile()
    }

   

    render(){

        const {user } = this.props.auth
        const {profile,loading} = this.props.profile // profile coing(check profileReducer)  
        console.log("--?",cities)
        let dashboardContent;
        if(profile == null || loading){
           dashboardContent = <Spinner/>
        }
        else{
           //check if logged in user has profile data
           
                dashboardContent = (
                   cities.map((e)=>{

                    return (


                     
         
            <Col xs={6} md={3}>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{e.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{e.state}</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
            </Col>
     


                       
                    )
                   })
                )
            
           
           
        }
        return (

            <div className = "dashboard">
            <div className = "container">
             <div className = "row">
              <div className = "col-md-12">
              
              <h1 className = "display-4">Dashboard</h1>
              <Container>
              <Row>
              {dashboardContent}
            </Row>
            </Container>


          
              </div> 
             </div>
            </div>
                     </div>
        )
    }
}

Dashboard.protoTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({

     profile:state.profile,
     auth:state.auth
});

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)