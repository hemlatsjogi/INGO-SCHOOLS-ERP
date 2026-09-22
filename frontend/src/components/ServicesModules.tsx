import { useEffect, useRef, useState } from "react";
import {
 ArrowRight,
 ArrowDown,
 CircleCheck,
 Circle,
 User,
 Bus,
 BookOpen,
 Bed,
} from "lucide-react";
import "./ServicesModules.css";
const departments = [
 {
   title: "Academics Management",
   subtitle: "Classes, curriculum & timetable",
 },
 {
   title: "Student Management",
   subtitle: "Profiles, attendance & progress",
 },
 {
   title: "HR & Finance Management",
   subtitle: "Staff, payroll & collections",
 },
 {
   title: "Exam Management",
   subtitle: "Assessments, results & reports",
 },
 {
   title: "Transport / Library / Hostel",
   subtitle: "Operations beyond the classroom",
 },
];
export default function ServicesModules() {
 const [activeDepartment, setActiveDepartment] = useState(0);
 const storyRef = useRef<HTMLElement>(null);
 useEffect(() => {
 const section = storyRef.current;
 if (!section) return;
 const handleScroll = () => {
   const rect = section.getBoundingClientRect();
   const viewportHeight = window.innerHeight;
   // Section ke andar kitna scroll hua
   const scrollDistance = section.offsetHeight - viewportHeight;
   if (scrollDistance <= 0) return;
   let progress = -rect.top / scrollDistance;
   // 0 → 1 ke beech rakho
   progress = Math.max(0, Math.min(1, progress));
   // 5 departments
   let index = Math.floor(progress * departments.length);
   if (index >= departments.length) {
     index = departments.length - 1;
   }
   setActiveDepartment(index);
 };
 window.addEventListener("scroll", handleScroll, {
   passive: true,
 });
 handleScroll();
 return () => {
   window.removeEventListener("scroll", handleScroll);
 };
 }, []);
 return (
   <section
     className="department-story"
     ref={storyRef}
   >
     <div className="department-sticky">
       {/* =========================
           HEADING
       ========================= */}
       <div className="department-heading">
         <h2>
           Every department.
           <br />
           <em>One intelligent flow.</em>
         </h2>
       </div>
       {/* =========================
           MAIN LAYOUT
       ========================= */}
       <div className="department-layout">
         {/* =========================
             LEFT DEPARTMENT LIST
         ========================= */}
         <div className="department-list">
           <div className="department-progress">
             <span
               style={{
                 height: `${
                   ((activeDepartment + 1) / 5) * 100
                 }%`,
               }}
             />
           </div>
           {departments.map(
             (department, index) => {
               const active =
                 activeDepartment === index;
               return (
                 <button
                   key={department.title}
                   className={`department-item ${
                     active ? "active" : ""
                   }`}
                   onClick={() =>
                     setActiveDepartment(index)
                   }
                 >
                   <span className="department-number">
                     {String(index + 1).padStart(2, "0")}
                   </span>
                   <span>
                     {department.title}
                     <small>
                       {department.subtitle}
                     </small>
                   </span>
                   <ArrowRight
                     size={15}
                     strokeWidth={1.7}
                   />
                 </button>
               );
             }
           )}
         </div>
         {/* =========================
             RIGHT PREVIEW
         ========================= */}
         <div className="department-preview">
           {/* =========================
               ACADEMIC
           ========================= */}
           <div
             className={`department-panel ${
               activeDepartment === 0
                 ? "active"
                 : ""
             }`}
           >
             <div className="panel-header">
               <div>
                 <span>
                   ACADEMIC CONTROL
                 </span>
                 <h3>
                   Plan the day before it begins.
                 </h3>
               </div>
               <div className="panel-live">
                 LIVE
               </div>
             </div>
             <div className="academic-dashboard">
               <div className="mini-calendar">
                 <div className="calendar-head">
                   <b>Monday</b>
                   <span>12 Aug</span>
                 </div>
                 <div className="calendar-row">
                   <span>09:00</span>
                   <b>Mathematics</b>
                   <i>VIII-A</i>
                 </div>
                 <div className="calendar-row">
                   <span>10:00</span>
                   <b>Science</b>
                   <i>VIII-A</i>
                 </div>
                 <div className="calendar-row">
                   <span>11:30</span>
                   <b>English</b>
                   <i>IX-B</i>
                 </div>
               </div>
               <div className="attendance-widget">
                 <span>
                   Today's attendance
                 </span>
                 <strong>
                   94.8%
                 </strong>
                 <div className="ring-chart">
                   <span>94</span>
                 </div>
               </div>
               <div className="task-widget">
                 <span>
                   Pending tasks
                 </span>
                 <div className="task-row">
                   <CircleCheck size={12} />
                   Lesson plan
                 </div>
                 <div className="task-row">
                   <CircleCheck size={12} />
                   Assignment review
                 </div>
                 <div className="task-row pending">
                   <Circle size={12} />
                   Weekly report
                 </div>
               </div>
             </div>
           </div>
           {/* =========================
               STUDENT
           ========================= */}
           <div
             className={`department-panel ${
               activeDepartment === 1
                 ? "active"
                 : ""
             }`}
           >
             <div className="panel-header">
               <div>
                 <span>
                   STUDENT MANAGEMENT
                 </span>
                 <h3>
                   Know every learner, not just their ID.
                 </h3>
               </div>
               <div className="panel-live">
                 LIVE
               </div>
             </div>
             <div className="student-dashboard">
               <div className="student-profile-card">
                 <div className="student-avatar">
                   <User size={17} />
                 </div>
                 <div>
                   <b>
                     Student overview
                   </b>
                   <small>
                     Class VIII — Section A
                   </small>
                 </div>
                 <span className="profile-active">
                   Active
                 </span>
               </div>
               <div className="student-metrics">
                 <div>
                   <small>
                     Attendance
                   </small>
                   <strong>
                     96%
                   </strong>
                 </div>
                 <div>
                   <small>
                     Assignments
                   </small>
                   <strong>
                     18/20
                   </strong>
                 </div>
                 <div>
                   <small>
                     Progress
                   </small>
                   <strong>
                     +12%
                   </strong>
                 </div>
               </div>
               <div className="progress-bars">
                 <div>
                   <span>Mathematics</span>
                   <b>86%</b>
                   <i>
                     <em
                       style={{
                         width: "86%",
                       }}
                     />
                   </i>
                 </div>
                 <div>
                   <span>Science</span>
                   <b>92%</b>
                   <i>
                     <em
                       style={{
                         width: "92%",
                       }}
                     />
                   </i>
                 </div>
               </div>
             </div>
           </div>
           {/* =========================
               HR & FINANCE
           ========================= */}
           <div
             className={`department-panel ${
               activeDepartment === 2
                 ? "active"
                 : ""
             }`}
           >
             <div className="panel-header">
               <div>
                 <span>
                   HR & FINANCE
                 </span>
                 <h3>
                   People and numbers, finally on one page.
                 </h3>
               </div>
               <div className="panel-live">
                 LIVE
               </div>
             </div>
             <div className="finance-dashboard">
               <div className="finance-card">
                 <small>
                   Fee collection
                 </small>
                 <strong>
                   ₹18.6L
                 </strong>
                 <span>
                   +14.2% this month
                 </span>
               </div>
               <div className="finance-card">
                 <small>
                   Payroll processed
                 </small>
                 <strong>
                   ₹9.4L
                 </strong>
                 <span>
                   All staff accounts clear
                 </span>
               </div>
               <div className="finance-chart">
                 <div className="bar b1"></div>
                 <div className="bar b2"></div>
                 <div className="bar b3"></div>
                 <div className="bar b4"></div>
                 <div className="bar b5"></div>
                 <div className="bar b6"></div>
                 <div className="bar b7"></div>
               </div>
             </div>
           </div>
           {/* =========================
               EXAM
           ========================= */}
           <div
             className={`department-panel ${
               activeDepartment === 3
                 ? "active"
                 : ""
             }`}
           >
             <div className="panel-header">
               <div>
                 <span>
                   EXAM MANAGEMENT
                 </span>
                 <h3>
                   From assessment to result, without the chase.
                 </h3>
               </div>
               <div className="panel-live">
                 LIVE
               </div>
             </div>
             <div className="exam-dashboard">
               <div className="exam-score">
                 <span>
                   Average score
                 </span>
                 <strong>
                   78.4
                 </strong>
                 <small>
                   Across current assessments
                 </small>
               </div>
               <div className="exam-result-list">
                 <div>
                   <span>Mathematics</span>
                   <b>84%</b>
                 </div>
                 <div>
                   <span>Science</span>
                   <b>81%</b>
                 </div>
                 <div>
                   <span>English</span>
                   <b>76%</b>
                 </div>
                 <div>
                   <span>Social Studies</span>
                   <b>72%</b>
                 </div>
               </div>
             </div>
           </div>
           {/* =========================
               TRANSPORT / LIBRARY / HOSTEL
           ========================= */}
           <div
             className={`department-panel ${
               activeDepartment === 4
                 ? "active"
                 : ""
             }`}
           >
             <div className="panel-header">
               <div>
                 <span>
                   CAMPUS OPERATIONS
                 </span>
                 <h3>
                   The parts outside the classroom stay connected too.
                 </h3>
               </div>
               <div className="panel-live">
                 LIVE
               </div>
             </div>
             <div className="operations-dashboard">
               <div className="operation-card">
                 <Bus size={19} />
                 <div>
                   <b>Transport</b>
                   <small>
                     18 routes active
                   </small>
                 </div>
                 <span className="operation-status">
                   On route
                 </span>
               </div>
               <div className="operation-card">
                 <BookOpen size={19} />
                 <div>
                   <b>Library</b>
                   <small>
                     426 books issued
                   </small>
                 </div>
                 <span className="operation-status">
                   Updated
                 </span>
               </div>
               <div className="operation-card">
                 <Bed size={19} />
                 <div>
                   <b>Hostel</b>
                   <small>
                     92% occupancy
                   </small>
                 </div>
                 <span className="operation-status">
                   Stable
                 </span>
               </div>
             </div>
           </div>
         </div>
       </div>
       {/* =========================
           SCROLL HINT
       ========================= */}
       <div className="department-scroll-hint">
         <ArrowDown size={13} />
       </div>
     </div>
   </section>
 );
}