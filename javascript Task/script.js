function validateForm(){
				let a=document.myform.name;
				let b=document.myform.em;
				let c=document.myform.pass;
				let d=document.myform.age;
				let e=document.myform.gen;
				let f=document.myform.ten;
				let g=document.myform.twe;
				let h=document.myform.grd;
				let i=document.myform.mobile;
				let j=document.myform.msg;
				
			if(a.value==""){
				alert("Enter Your Name!!!!");
				a.focus();
				return false;
			}
			if(b.value==""){
				alert("Enter Your Email!!!!");
				b.focus();
				return false;
			}
			if(c.value==""){
				alert("Enter Your password!!!!");
				c.focus();
				return false;
			}
			if(d.value=="select"){
				alert("Enter Your Age");
				d.focus();
				return false;
			}
			if(e[0].checked==false && e[1].checked==false){
				alert("Select Your Gender!!!!");
				e[0].focus();
				return false;
			}
			if(f.checked==false && g.checked==false && h.checked==false){
				alert("Select Your Qualification!!!!");
				return false;
			}
			if(i.value==""){
				alert("Enter Your Mobile!!!!");
				i.focus();
				return false;
			}
			if(j.value==""){
				alert("Please Give Us Your Feedback!!");
				j.focus();
				return false;
			}
			}