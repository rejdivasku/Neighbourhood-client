import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import './styles.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../helpers/AuthContext";

export function AdministrativeUnit() {
     let { id } = useParams();
     const { authState } = useContext(AuthContext);

     const [admnsPosts, setAdmnsPosts] = useState([]);
     const [show, setShow] = useState(false);
     const [postAdd, setPostAdd] = useState(false);
     const [isEdit, setIsEdit] = useState(false);
     const [showDelete, setShowDelete] = useState(false);
     const [isLoading, setIsloading] = useState(false);
     const [admnsInfo, setAdmnsInfo] = useState({});
     const [itemEdit, setItemEdit] = useState({});
     const [deleteItem, setDeleteItem] = useState('');
     const [editItemId, setEditItemId] = useState('');

     const handleClose = () => {
          setItemEdit({});
          setShow(false);
          setIsEdit(false);
     }

     const handleCloseDelete = () => {
          setShowDelete(false)
     }

     const handleShow = () => setShow(true);

     const initialValues = {
          title: itemEdit.title ? itemEdit.title : "",
          description: itemEdit.description ? itemEdit.description : "",
          category: itemEdit.category ? itemEdit.category : "",
          admnsUnit: id,
          createdBy: itemEdit.createdBy ? itemEdit.createdBy : authState.username,
          createdById: isEdit ? itemEdit.createdById : authState.id,
          updatedBy: isEdit ? authState.id : '',
          updatedById: isEdit ? authState.id : ''
     };

     const validationSchema = Yup.object().shape({
          title: Yup.string().required("You must input a Title!"),
          description: Yup.string().required("You must input a Description!"),
          category: Yup.string().required("You must input a Category!")
     });

     useEffect(() => {
          getList();
          getUnitData();
     }, []);

     const getList = async () => {
          setIsloading(true)
          let list = await axios.get(`https://neighbourhood-server.vercel.app/post/byAdmnsId/${id}`)
          if (list.status === 200) {
               setAdmnsPosts(list.data);
          } else {
               alert("Something went wrong fetching");
          }
          setIsloading(false)
     }

     const getUnitData = async () => {
          setIsloading(true)
          let list = await axios.get(`https://neighbourhood-server.vercel.app/admns/admnsId/${id}`)
          if (list.status === 200) {
               setAdmnsInfo(list.data[0]);
          } else {
               alert("Something went wrong fetching");
          }
          setIsloading(false)
     }

     const CreatePost = (data) => {
          console.log(data)
          setIsloading(true)
          if (isEdit) {
               axios.put("https://neighbourhood-server.vercel.app/post/updatePost", {
                    ...data, id: editItemId
               },
                    {
                         headers: { accessToken: localStorage.getItem("accessToken") },
                    }).then((response) => {
                         if (response.data.error) {
                              alert(response.data.error);
                         } else {
                              setPostAdd(true)
                              getList();
                              setShow(false);
                              setTimeout(() => {
                                   setPostAdd(false)
                              }, 3000);
                         }
                    });
          } else {
               axios.post("https://neighbourhood-server.vercel.app/post", data).then((response) => {
                    if (response.data.error) {
                         alert(response.data.error);
                    } else {
                         setPostAdd(true)
                         getList();
                         setShow(false);
                         setTimeout(() => {
                              setPostAdd(false)
                         }, 3000);
                    }
               });
          }
          setIsloading(false)
     };
     console.log(authState)
     const deletePost = () => {
          setIsloading(true)
          axios.delete(`https://neighbourhood-server.vercel.app/post/${deleteItem}`, {
               headers: { accessToken: localStorage.getItem("accessToken") },
          })
               .then(() => {
                    setDeleteItem('');
                    setShowDelete(false);
                    getList();
               });
          setIsloading(false)
     };

     function handleEdit(item) {
          setEditItemId(item.id)
          setItemEdit(item);
          setIsEdit(true);
          setShow(true);
     }

     return (
          <div style={{ display: 'flex', padding: '20px' }}>
               <div className="info-div">
                    <Card>
                         <Card.Img variant="top" src={admnsInfo.imgUrl} />
                         <Card.Body>
                              <Card.Title>{admnsInfo.title}</Card.Title>
                              <Card.Text>
                                   {admnsInfo.description}
                              </Card.Text>
                              <Button variant="primary" disabled={!authState.id} onClick={handleShow}>Create Post</Button>
                         </Card.Body>
                    </Card>
               </div>
               <div>
                    {isLoading ? (
                         <span>loading</span>
                    ) :
                         admnsPosts?.length > 0 ? admnsPosts?.map(item => {
                              return (
                                   <div key={item.id}>
                                        <Card className="item-div">
                                             <Card.Header as="h5">
                                                  <div style={{ display: 'flex' }}>
                                                       {item.title}
                                                       {
                                                            item.createdBy === authState?.username && (
                                                                 <div style={{ marginLeft: 'auto' }}>
                                                                      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                                           <button className="button-css-remove" onClick={e => handleEdit(item)}>
                                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                                           </button>
                                                                      </OverlayTrigger>
                                                                      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                                                           <button className="button-css-remove" onClick={e => {
                                                                                setShowDelete(true);
                                                                                setDeleteItem(item.id)
                                                                           }}>
                                                                                <FontAwesomeIcon icon={faCircleXmark} />
                                                                           </button>
                                                                      </OverlayTrigger>
                                                                 </div>
                                                            )
                                                       }
                                                  </div>
                                             </Card.Header>
                                             <Card.Body>
                                                  <Card.Title>@{item.createdBy}  {item.createdAt.substring(0, 10)}</Card.Title>
                                                  <Card.Text>
                                                       {item.description}
                                                  </Card.Text>
                                                  <Button variant="primary">Details</Button>
                                             </Card.Body>
                                        </Card>
                                   </div>
                              )
                         }) :
                              <span>No Posts Yet!!</span>
                    }
               </div>
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>{isEdit ? 'Edit Post' : 'Create New Post'} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Formik
                              initialValues={initialValues}
                              onSubmit={CreatePost}
                              validationSchema={validationSchema}
                         >
                              <Form className="form-post">
                                   <label>Title </label>
                                   <Field
                                        id="inputCreatePost"
                                        name="title"
                                        placeholder="Title"
                                   />
                                   <ErrorMessage className="validation-alert" name="title" component="span" />
                                   <label>Description </label>
                                   <Field
                                        id="inputCreatePost"
                                        name="description"
                                        placeholder="Description"
                                   />
                                   <ErrorMessage className="validation-alert" name="description" component="span" />
                                   <label>Category </label>
                                   <Field
                                        id="inputCreatePost"
                                        name="category"
                                        placeholder="Category"
                                   />
                                   <ErrorMessage className="validation-alert" name="category" component="span" />
                                   <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                             Close
                                        </Button>
                                        <Button variant="primary" type="Submit">
                                             {isEdit ? 'Edit Post' : 'Create Post'}
                                        </Button>
                                   </Modal.Footer>
                              </Form>
                         </Formik>
                    </Modal.Body>
               </Modal>

               <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                         <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <p>Are you sure you want to delete this post?</p>
                    </Modal.Body>

                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
                         <Button variant="danger" onClick={deletePost}>Delete</Button>
                    </Modal.Footer>
               </Modal>
               <Alert style={{ position: 'absolute', left: '50%', zIndex: 10000, boxShadow: '1px 2px 9px #3c376e' }} variant="success" show={postAdd} onClose={() => setPostAdd(false)}>
                    {isEdit ? 'The post was updated successfully!' : 'The post was created successfully!'}
               </Alert>

          </div>
     )
}