import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaStar, FaSchool, FaBriefcase } from 'react-icons/fa';

const Information = () => {
  const [elements, setElements] = useState([
    {
      id: 1,
      date: '2011 - present',
      title: 'Francisco de Asís',
      subtitle: 'Montilla',
      description: 'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
      type: 'work',
    },
    {
      id: 2,
      date: '2010 - 2011',
      title: 'Art Director',
      subtitle: 'San Francisco, CA',
      description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
      type: 'work',
    },
    // Agrega los demás elementos aquí...
  ]);

  const [show, setShow] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    subtitle: '',
    description: '',
    type: 'work',
  });

  const handleShow = (element) => {
    if (element) {
      setCurrentElement(element);
      setFormData(element);
    } else {
      setCurrentElement(null);
      setFormData({
        date: '',
        title: '',
        subtitle: '',
        description: '',
        type: 'work',
      });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (currentElement) {
      setElements(elements.map(el => (el.id === currentElement.id ? formData : el)));
    } else {
      setFormData({ ...formData, id: elements.length + 1 });
      setElements([...elements, { ...formData, id: elements.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return <FaBriefcase />;
      case 'education':
        return <FaSchool />;
      default:
        return <FaStar />;
    }
  };

  return (
    <div className="container">
      <Button onClick={() => handleShow(null)} className="mb-3">Add Element</Button>
      <VerticalTimeline>
        {elements.map(element => (
          <VerticalTimelineElement
            key={element.id}
            className={`vertical-timeline-element--${element.type}`}
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={element.date}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={getIcon(element.type)}
          >
            <h3 className="vertical-timeline-element-title">{element.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{element.subtitle}</h4>
            <p>{element.description}</p>
            <Button variant="warning" onClick={() => handleShow(element)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(element.id)}>Delete</Button>
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<FaStar />}
        />
      </VerticalTimeline>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentElement ? 'Edit Element' : 'Add Element'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubtitle">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Information;

