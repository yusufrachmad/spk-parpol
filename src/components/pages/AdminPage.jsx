import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Table,
  Modal,
  Form,
  FormSelect,
} from "react-bootstrap";
import AdminLanding from "./AdminLanding";

const Kriteria = () => {
  const [kriteria, setKriteria] = useState([]);
  const getKriteria = async () => {
    try {
      const { data, error } = await supabase
        .from("kriteria")
        .select("*")
        .order("id_kriteria", { ascending: true });
      if (error) {
        alert(error);
      } else {
        setKriteria(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getKriteria();
  }, []);

  const [formData, setFormData] = useState({
    id_kriteria: "",
    nama_kriteria: "",
    bobot: "",
    kode_kriteria: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "id_kriteria") {
      updatedValue = parseInt(value);
    }

    if (name === "bobot") {
      updatedValue = parseFloat(value);
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: updatedValue,
      };
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [setUpdate, setSetUpdate] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (kriteriaId) => {
    setShowModal(true);

    if (kriteriaId) {
      const selectedKriteria = kriteria.find(
        (kriteria) => kriteria.id_kriteria === kriteriaId
      );

      if (selectedKriteria) {
        setFormData({
          id_kriteria: selectedKriteria.id_kriteria,
          nama_kriteria: selectedKriteria.nama_kriteria,
          bobot: selectedKriteria.bobot,
          kode_kriteria: selectedKriteria.kode_kriteria,
        });

        setSetUpdate(true);
      }
    } else {
      setFormData({
        id_kriteria: "",
        nama_kriteria: "",
        bobot: "",
        kode_kriteria: "",
      });

      setSetUpdate(false);
    }
  };

  const handleInsert = async () => {
    try {
      const { error } = await supabase.from("kriteria").insert([formData]);

      getKriteria();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
    }

    setShowModal(false);
  };

  const handleDelete = async (kriteriaId) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin akan delete data ini?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("kriteria")
          .delete()
          .eq("id_kriteria", kriteriaId);
        const { error2 } = await supabase
          .from("subkriteria")
          .delete()
          .eq("id_kriteria", kriteriaId);
        const { error3 } = await supabase
          .from("profil_partai")
          .delete()
          .eq("id_kriteria", kriteriaId);

        getKriteria();
        if (error) {
          console.log(error);
        }
        if (error2) {
          console.log(error2);
        }
        if (error3) {
          console.log(error3);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleUpdate = async (kriteriaId) => {
    try {
      const { error } = await supabase
        .from("kriteria")
        .update(formData)
        .eq("id_kriteria", kriteriaId);

      getKriteria();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
    }

    setShowModal(false);
  };

  return (
    <>
      <Container>
        <h2>Kriteria</h2>
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Tambah Data
        </Button>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Id Kriteria</th>
              <th>Nama Kriteria</th>
              <th>Bobot Kriteria</th>
              <th>Kode Kriteria</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kriteria.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id_kriteria}</td>
                  <td>{item.nama_kriteria}</td>
                  <td>{item.bobot}</td>
                  <td>{item.kode_kriteria}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(item.id_kriteria)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id_kriteria)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {setUpdate ? (
            <Modal.Title>Edit Kriteria</Modal.Title>
          ) : (
            <Modal.Title>Insert Kriteria</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            {setUpdate ? (
              ""
            ) : (
              <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>Id Kriteria</Form.Label>
                <Form.Control
                  type="number"
                  name="id_kriteria"
                  placeholder="Masukkan Id Kriteria"
                  onChange={handleChange}
                  defaultValue={formData.id_kriteria}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicNama">
              <Form.Label>Nama Kriteria</Form.Label>
              <Form.Control
                type="text"
                name="nama_kriteria"
                placeholder="Masukkan Nama Kriteria"
                onChange={handleChange}
                defaultValue={setUpdate ? formData.nama_kriteria : ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBobot">
              <Form.Label>Bobot Kriteria</Form.Label>
              <Form.Control
                type="number"
                name="bobot"
                placeholder="Masukkan Bobot Kriteria"
                onChange={handleChange}
                defaultValue={setUpdate ? formData.bobot : ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicKode">
              <Form.Label>Kode Kriteria</Form.Label>
              <Form.Control
                type="text"
                name="kode_kriteria"
                placeholder="Masukkan Kode Kriteria"
                onChange={handleChange}
                defaultValue={setUpdate ? formData.kode_kriteria : ""}
                required
              />
            </Form.Group>
            {setUpdate ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUpdate(formData.id_kriteria)}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleInsert()}
              >
                Insert
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProfilPartai = () => {
  const [profilPartai, setProfilPartai] = useState([]);
  const getProfilPartai = async () => {
    try {
      const { data, error } = await supabase
        .from("profil_partai")
        .select("id_profil, kode, value, detail_partai(nama_partai)")
        .order("id_profil", { ascending: true });
      if (error) {
        alert(error);
      } else {
        console.log(data);
        setProfilPartai(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProfilPartai();
  }, []);

  const [formData, setFormData] = useState({
    id_profil: "",
    kode: "",
    value: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "id_profil") {
      updatedValue = parseInt(value);
    }

    if (name === "value") {
      updatedValue = parseFloat(value);
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: updatedValue,
      };
    });
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (profilId) => {
    const selectedKriteria = profilPartai.find(
      (profil) => profil.id_profil === profilId
    );

    if (selectedKriteria) {
      setFormData({
        id_profil: selectedKriteria.id_profil,
        kode: selectedKriteria.kode,
        value: selectedKriteria.value,
      });
    }
    setShowModal(true);
  };

  const handleUpdate = async (userId) => {
    try {
      const { error } = await supabase
        .from("profil_partai")
        .update(formData)
        .eq("id_profil", userId);

      getProfilPartai();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
    }

    setShowModal(false);
  };

  return (
    <>
      <Container>
        <h2>Profil Partai</h2>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Id Profil</th>
              <th>Nama Partai</th>
              <th>Kode</th>
              <th>Value</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {profilPartai.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id_profil}</td>
                  <td>{item.detail_partai.nama_partai}</td>
                  <td>{item.kode}</td>
                  <td>{item.value}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(item.id_profil)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profil Partai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicNama">
              <Form.Label>Kode</Form.Label>
              <Form.Control
                type="text"
                name="kode"
                placeholder="Masukkan Kode"
                onChange={handleChange}
                defaultValue={formData.kode}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBobot">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                name="bobot"
                placeholder="Masukkan Value"
                onChange={handleChange}
                defaultValue={formData.value}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleUpdate(formData.id_profil)}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
const Subkriteria = () => {
  const [subKriteria, setSubKriteria] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [profilPartai, setProfilPartai] = useState([]);
  const getSubKriteria = async () => {
    try {
      const { data, error } = await supabase
        .from("subkriteria")
        .select("*, kriteria(kode_kriteria)")
        .order("id_subkriteria", { ascending: true });

      const { data: kriteria, error2 } = await supabase
        .from("kriteria")
        .select("id_kriteria, kode_kriteria")
        .order("id_kriteria", { ascending: true });

      const { data: profil, error3 } = await supabase
        .from("detail_partai")
        .select("id_partai, singkatan")
        .order("id_partai", { ascending: true });

      if (error) {
        alert(error);
      } else {
        setSubKriteria(data);
        setKriteria(kriteria);
        setProfilPartai(profil);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getSubKriteria();
  }, []);

  const [formData, setFormData] = useState({
    id_subkriteria: "",
    subkriteria: "",
    kode: "",
    faktor: "",
    deskripsi: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "id_subkriteria") {
      updatedValue = parseInt(value);
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: updatedValue,
      };
    });
  };

  const [formInsertData, setFormInsertData] = useState({
    id_subkriteria: "",
    subkriteria: "",
    kode: "",
    faktor: "",
    kriteria: "",
    deskripsi: "",
    id_profil: "",
    value: {},
  });
  const handleInsertChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "id_subkriteria") {
      updatedValue = parseInt(value);
    }

    setFormInsertData((prevFormData) => {
      if (!isNaN(parseInt(name))) {
        const updatedPartyValues = {
          ...prevFormData,
          value: {
            ...prevFormData.value,
            [name]: parseFloat(updatedValue),
          },
        };

        return updatedPartyValues;
      }

      return {
        ...prevFormData,
        [name]: updatedValue,
      };
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [setUpdate, setSetUpdate] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (subKriteriaId) => {
    setShowModal(true);
    if (subKriteriaId) {
      const selectedKriteria = subKriteria.find(
        (subkriteria) => subkriteria.id_subkriteria === subKriteriaId
      );
      if (selectedKriteria) {
        setFormData({
          id_subkriteria: selectedKriteria.id_subkriteria,
          subkriteria: selectedKriteria.subkriteria,
          kode: selectedKriteria.kode,
          faktor: selectedKriteria.faktor,
          deskripsi: selectedKriteria.deskripsi,
        });
      }
      setSetUpdate(true);
    } else {
      setFormInsertData({
        id_subkriteria: subKriteria.length + 1,
        subkriteria: "",
        kode: `SC${subKriteria.length + 1}`,
        faktor: "CF",
        kriteria: "10",
        deskripsi: "",
        id_profil: "",
        value: {},
      });
      setSetUpdate(false);
    }
  };

  const handleUpdate = async (subKriteriaId) => {
    try {
      const { error } = await supabase
        .from("subkriteria")
        .update(formData)
        .eq("id_kriteria", subKriteriaId);

      getSubKriteria();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert(error);
    }

    setShowModal(false);
  };

  const handleInsert = async () => {
    try {
      const { error } = await supabase.from("subkriteria").insert({
        id_subkriteria: formInsertData.id_subkriteria,
        id_kriteria: formInsertData.kriteria,
        subkriteria: formInsertData.subkriteria,
        kode: formInsertData.kode,
        faktor: formInsertData.faktor,
        deskripsi: formInsertData.deskripsi,
      });

      for (const [key, value] of Object.entries(formInsertData.value)) {
        const { error2 } = await supabase.from("profil_partai").insert({
          id_profil: parseInt(key),
          kode: formInsertData.kode,
          value: parseFloat(value),
          id_subkriteria: formInsertData.id_subkriteria,
          id_kriteria: formInsertData.kriteria,
        });
      }

      getSubKriteria();
      if (error) {
        console.log(error);
      }
    } catch {
      alert(error);
    }
  };
  const handleDelete = async (subKriteriaId) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin akan delete data ini?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("subkriteria")
          .delete()
          .eq("id_subkriteria", subKriteriaId);
        const { error2 } = await supabase
          .from("profil_partai")
          .delete()
          .eq("id_subkriteria", subKriteriaId);

        getSubKriteria();
        if (error) {
          console.log(error);
        }
        if (error2) {
          console.log(error2);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <Container>
        <h2>Sub Kriteria</h2>
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Tambah Data
        </Button>

        <Table responsive="sm">
          <thead>
            <tr>
              <th>Id Subkriteria</th>
              <th>Nama Subkriteria</th>
              <th>Kode</th>
              <th>Faktor</th>
              <th>Kriteria</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {subKriteria.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id_subkriteria}</td>
                  <td>{item.subkriteria}</td>
                  <td>{item.kode}</td>
                  <td>{item.faktor}</td>
                  <td>{item.kriteria.kode_kriteria}</td>
                  <td>{item.deskripsi}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(item.id_subkriteria)}
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id_subkriteria)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {setUpdate ? (
            <Modal.Title>Update Sub Kriteria</Modal.Title>
          ) : (
            <Modal.Title>Insert Sub Kriteria</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            {setUpdate ? (
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama Subkriteria</Form.Label>
                <Form.Control
                  type="text"
                  name="subkriteria"
                  placeholder="Masukkan Nama"
                  onChange={handleChange}
                  defaultValue={formData.subkriteria}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>ID dan Nama Subkriteria</Form.Label>
                <div className="d-flex col-md-12">
                  <Form.Control
                    className="me-3"
                    type="number"
                    name="id_subkriteria"
                    placeholder="Masukkan Id Sub Kriteria"
                    defaultValue={subKriteria.length + 1}
                    onChange={handleInsertChange}
                    required
                  />
                  <Form.Control
                    type="text"
                    name="subkriteria"
                    placeholder="Masukkan Nama Kriteria"
                    onChange={handleInsertChange}
                    required
                  />
                </div>
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicNama">
              <Form.Label>Kode, Faktor, dan Kriteria</Form.Label>
              <div className="d-flex col-md-12">
                <Form.Control
                  className="me-3"
                  type="text"
                  name="kode"
                  placeholder="Masukkan Kode"
                  onChange={setUpdate ? handleChange : handleInsertChange}
                  defaultValue={
                    setUpdate ? formData.kode : `SC${subKriteria.length + 1}`
                  }
                  required
                />
                <FormSelect
                  className="me-3"
                  aria-label="Default select example"
                  defaultValue={setUpdate ? formData.faktor : ""}
                  onChange={setUpdate ? handleChange : handleInsertChange}
                  name="faktor"
                  required
                >
                  <option value="CF">CF</option>
                  <option value="SF">SF</option>
                </FormSelect>
                <FormSelect
                  aria-label="Default select example"
                  defaultValue={setUpdate ? formData.kriteria : ""}
                  onChange={setUpdate ? handleChange : handleInsertChange}
                  name="kriteria"
                  required
                >
                  {kriteria.map((item, index) => {
                    return (
                      <option key={index} value={item.id_kriteria}>
                        {item.kode_kriteria}
                      </option>
                    );
                  })}
                </FormSelect>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBobot">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as={"textarea"}
                type="text"
                name="deskripsi"
                placeholder="Masukkan Deskripsi"
                onChange={setUpdate ? handleChange : handleInsertChange}
                defaultValue={setUpdate ? formData.deskripsi : ""}
                required
              />
            </Form.Group>
            {setUpdate ? (
              ""
            ) : (
              <Form.Group className="mb-3" controlId="formBasicBobot">
                <Form.Label>Nilai Partai</Form.Label>
                <div className="d-flex flex-wrap justify-content-center">
                  {profilPartai.map((item, index) => (
                    <div
                      key={index}
                      className="me-3 mb-3"
                      style={{ minWidth: "200px" }}
                    >
                      <Form.Label>{item.singkatan}</Form.Label>
                      <Form.Control
                        type="number"
                        name={item.id_partai}
                        placeholder="Masukkan Nilai"
                        onChange={handleInsertChange}
                        required
                      />
                    </div>
                  ))}
                </div>
              </Form.Group>
            )}
          </Form>
          {setUpdate ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleUpdate(formData.id_subkriteria)}
            >
              Update
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => handleInsert()}>
              Insert
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

const AdminPage = (props) => {
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah anda yakin akan logout?");
    if (confirmLogout) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error);
      } else {
        sessionStorage.removeItem("token");
        props.setToken(false);
      }
    }
  };
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" className="pb-2 mb-4">
        <Container className="align-items-center">
          <Navbar.Brand>Admin Panel</Navbar.Brand>
          <Nav>
            <Link to="kriteria">
              <Button>Kriteria</Button>
            </Link>
            <Link to="profil-partai">
              <Button>Profil Partai</Button>
            </Link>
            <Link to="subkriteria">
              <Button>Subkriteria</Button>
            </Link>
            <Button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<AdminLanding />} />
        <Route path="kriteria" element={<Kriteria />} />
        <Route path="profil-partai" element={<ProfilPartai />} />
        <Route path="subkriteria" element={<Subkriteria />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
