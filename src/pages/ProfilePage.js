import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import account from '../_mock/account';

export default function EditButton() {
  console.log('profile page');
  console.log(account);
  
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: 'rgba(145, 158, 171, 0.12)' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: 'darkcyan', height: '200px' }}
              >
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage
                    src={account.photoURL}
                    alt="No image found"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: '150px', zIndex: '1' }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{account.displayName}</MDBTypography>
                  <MDBCardText>{account.role}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Personal Informations</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Field</th>
                          <th scope="col">Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Email</td>
                          <td>{account.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Phone</td>
                          <td>{account.phone}</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Profession</td>
                          <td>{account.profession}</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Address</td>
                          <td>{account.address}</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Age</td>
                          <td>{account.age}</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Gender</td>
                          <td>{account.gender}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}