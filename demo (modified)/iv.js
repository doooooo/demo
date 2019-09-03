function jsc(q,xj,L)
{
	R = 0.3; 
	//solar spectrum inputs
	F = 1.15e17; //////////////// xls
	//F = readFile("F.txt");
	a = 236000000; ////////////////// xls
	//a= readFile("a.txt");
	//var Jsc = q*F*(1-R) * (a*L/(Math.pow(a*L,2)-1)) * (1/(0.5 * (Math.exp(xj/L) + Math.exp(-xj/L)))) * (a*L -Math.exp((a*L-1)*xj/L));
	//l=readFile("l.txt");
	//l1=l[0];
	//l2=l[l.length];
	//Jsc = trapz_func(0,q*F*(1-R) * (a*L/(Math.pow(a*L,2)-1)) * (1/(0.5 * (Math.exp(xj/L) + Math.exp(-xj/L)))) * (a*L -Math.exp((a*L-1)*xj/L)),l1,l2);
	var Jsc = q*F*(1-R) * (a*L/(Math.pow(a*L,2)-1)) * (1/(0.5 * (Math.exp(xj/L) + Math.exp(-xj/L)))) * (a*L -Math.exp((a*L-1)*xj/L));
	return Jsc;
}
function iv_func(NA,ND,T) {
	//constants and conversions
	v = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];
	//v = [0,0.1,0.2,0.3,0.4]; xxx
	KT = (8.617*1e-5)*T;
	//NA = NA*1e6; %cm-3 to m-3 
	//ND = ND*1e6; %
	//ni = 1e10;
	//ni = sqrt(Nc*Nv).*exp(-Eg*q./(2*kT));
	Eg = 1.1;
	epson_0=8.854187817 * 1e-12;//m-3 kg-1 s4 A2
	epson_Si=11.8;
	q=1.602176462 * 1e-19;
	kT = (1.38*1e-23)*T;
	J0=3.8e-8;//A/m2
	//J0=1e-8;//A/m2
	
	WD1=0;///////////////
	//xj=Le-WD1;
	J=[];
	//var result = Le+Lb; xxx
	ue=1041.2*1e-4;//m2V-1s-1
	uh=421.6*1e-4;//m2V-1s-1
	//
	De=26.93*1e-4;//m2.s-1
	Dh=10.9*1e-4;//m2.s-1
	C=1.66*1e-30*1e-12;//m6/s Auger coeff
	CN=2.8*1e-31*1e-12;//m6/s Auger coeff
	CA=9.9*1e-32*1e-12;//m6/s Auger coeff
	//Auger Lifetime
	te=1/(CA*NA*NA*1e6*1e6);
	th=1/(CN*ND*ND*1e6*1e6);
	//or
	//te=1/(C*NA*NA*1e6*1e6);
	//th=1/(C*ND*ND*1e6*1e6);
	Le=Math.sqrt(te*ue*kT/q);
	Lb=Math.sqrt(th*uh*kT/q);
	//Le=Math.sqrt(te*De);
	//Lb=Math.sqrt(th*Dh);
	//alert(te+' te');
	//alert(th+' th');
	//alert(Le+' Le');
	//alert(Lb+' Lh');
	G0=1e18*1e6;
	var result = q*G0*(Le+Lb);
	//console.log(jsc(q,xj,result));
	for(i=0;i<v.length;i++)
	{
	
		//J[i]=J0*(Math.exp(q*v[i]/(kT))-1)-result; xxx
		J[i]=result-J0*(Math.exp(q*v[i]/(kT))-1);
		//J[i]=J[i]*1e-4;//A/cm2
		if(J[i] < 0)
			J[i]=0;
	}
	//J = J0*(Math.exp(q*v/(kT))-1)-Jsc(q,xj,L_emitter+L_base);
	//J=1;
	
	return J;
}

function trapz_func( initial_val,Fx,x1,x2 )
{
sum = initial_val;
dx = abs(x1-x2)/length(Fx);

for (i= 2;i<Fx.length;i++)
{
    sum = (Fx[i-1]+Fx[i])*0.5*dx + sum;
}   

return sum;
}

/*function readFile(filename)
{
	var fs = require("fs");
	var text = fs.readFileSync("./"+filename);
	var textByLine = text.split("\n");
	var arr = [];
	for(i=0;i<textByLine.length;i++)
	{
		arr[i]=parseInt(textByLine[i]);
	}
	return arr;
}*/


