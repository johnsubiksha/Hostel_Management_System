from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Enum, Text, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from dotenv import load_dotenv
import os
import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = 'users'
    register_number = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)
    student = relationship("Student", back_populates="user", uselist=False)

class Student(Base):
    __tablename__ = 'students'
    register_number = Column(String, ForeignKey('users.register_number'), primary_key=True)
    department = Column(String)
    year = Column(Integer)
    room_id = Column(Integer, ForeignKey('room.room_id'), nullable=True)
    user = relationship("User", back_populates="student")

class Complaint(Base):
    __tablename__ = 'complaints'
    id = Column(Integer, primary_key=True, index=True)
    register_number = Column(String, ForeignKey('users.register_number'))
    category = Column(String)
    complaint = Column(Text)
    created_at = Column(DateTime, default=func.now())

class Room(Base):
    __tablename__ = 'room'
    room_id = Column(Integer, primary_key=True)
    room_number = Column(String)
    room_type = Column(String)
    ac_status = Column(String)
    is_available = Column(Integer, default=1)

class Outpass(Base):
    __tablename__ = 'outpass'
    id = Column(Integer, primary_key=True)
    register_number = Column(String, ForeignKey('students.register_number'))
    reason = Column(Text)
    intime = Column(String)
    outtime = Column(String)
    indate = Column(String)
    outdate = Column(String)
    status = Column(String, default="Pending")

class Payment(Base):
    __tablename__ = 'fee_payments'
    id = Column(Integer, primary_key=True)
    student_id = Column(String, ForeignKey('students.register_number'))
    amount = Column(Integer)
    fee_type = Column(String)
    description = Column(Text, nullable=True)
    payment_date = Column(DateTime, default=func.now())

# Schemas
class LoginRequest(BaseModel):
    email: str
    password: str

class ComplaintRequest(BaseModel):
    regNum: str
    category: str
    complaint: str

class OutpassRequest(BaseModel):
    register_number: str
    reason: str
    intime: str
    outtime: str
    indate: str
    outdate: str

class PaymentRequest(BaseModel):
    studentId: str
    amount: int
    fee_type: str
    description: str = None

# Dependency

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/")
def root():
    return {"message": "Hostel Management System Backend Running Successfully!"}

@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.password != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "id": user.register_number,
        "email": user.email,
        "role": user.role,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(token_data, os.getenv("JWT_SECRET"), algorithm="HS256")
    return {"success": True, "token": token, "role": user.role}

@app.post("/complaints")
def create_complaint(data: ComplaintRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.register_number == data.regNum).first()
    if not user:
        raise HTTPException(status_code=400, detail="Register number not found!")

    complaint = Complaint(register_number=data.regNum, category=data.category, complaint=data.complaint)
    db.add(complaint)
    db.commit()
    return {"message": "Complaint submitted successfully!"}

@app.get("/complaints")
def get_complaints(db: Session = Depends(get_db)):
    complaints = db.query(Complaint, User).join(User, Complaint.register_number == User.register_number).all()
    return [{
        "name": user.name,
        "email": user.email,
        "register_number": complaint.register_number,
        "category": complaint.category,
        "complaint": complaint.complaint,
        "created_at": complaint.created_at
    } for complaint, user in complaints]

# Continue similarly for outpass, payments, room allocation, and student details routes...
