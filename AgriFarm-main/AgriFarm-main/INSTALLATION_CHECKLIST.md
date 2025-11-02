# ✅ AgriFarm Installation Checklist

Use this checklist to ensure you've completed all setup steps correctly.

## 📋 Prerequisites

- [ ] Node.js installed (v14 or higher)
- [ ] MongoDB Atlas account created
- [ ] Cloudinary account created
- [ ] Terminal/Command Prompt ready
- [ ] Code editor installed (VS Code recommended)

## 🔧 Backend Setup

### 1. Backend Installation
- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Verify `node_modules` created successfully

### 2. Environment Configuration
- [ ] Copy `env.example` to `.env`
- [ ] Get MongoDB Atlas connection string
- [ ] Add MongoDB URI to `.env`
- [ ] Generate JWT secret and add to `.env`
- [ ] Get Cloudinary credentials
- [ ] Add Cloudinary details to `.env`

### 3. MongoDB Atlas Setup
- [ ] Cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0 for testing)
- [ ] Connection string copied
- [ ] Connection string updated in `.env`
- [ ] Replaced username and password in URI

### 4. Cloudinary Setup
- [ ] Account created
- [ ] Cloud name retrieved
- [ ] API key copied
- [ ] API secret copied
- [ ] Credentials added to `.env`

### 5. Backend Testing
- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] "MongoDB Connected" message appears
- [ ] Server running on port 5000
- [ ] Visit `http://localhost:5000/api/health`
- [ ] See "OK" response

## 🎨 Frontend Setup

### 1. Frontend Installation
- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`
- [ ] Verify `node_modules` created successfully

### 2. Environment Configuration
- [ ] Create `.env` file in frontend root
- [ ] Add `VITE_API_URL=http://localhost:5000/api`
- [ ] Save `.env` file

### 3. Frontend Testing
- [ ] Run `npm run dev`
- [ ] Frontend starts without errors
- [ ] Browser opens automatically
- [ ] No console errors

## 🔗 Integration Testing

### 1. API Connection
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] No CORS errors in browser
- [ ] Network requests show in DevTools

### 2. Authentication Testing
- [ ] Registration form works
- [ ] Can create new account
- [ ] Login form works
- [ ] Can login successfully
- [ ] Token stored in localStorage
- [ ] User data persisted

### 3. Crop Management Testing
- [ ] Can view crops list
- [ ] Can add new crop (if farmer)
- [ ] Can edit crop details
- [ ] Can delete crop
- [ ] Search functionality works
- [ ] Filters apply correctly

### 4. Cart Testing
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Cart persists on refresh

### 5. Order Testing
- [ ] Can create order from cart
- [ ] Order appears in history
- [ ] Stock updated correctly
- [ ] Cart cleared after order

## 🔍 Security Checks

- [ ] `.env` files in `.gitignore`
- [ ] No sensitive data in code
- [ ] HTTPS configured (production)
- [ ] Strong JWT secret set
- [ ] MongoDB access restricted (production)
- [ ] CORS configured correctly

## 🚀 Production Readiness

### Before Deployment
- [ ] All tests passing
- [ ] Error handling working
- [ ] Logs configured
- [ ] Database backed up
- [ ] Environment variables set on host
- [ ] HTTPS enabled
- [ ] Domain configured
- [ ] Monitoring set up

### Deployment Checklist
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] MongoDB Atlas secured
- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] Images uploading correctly
- [ ] Authentication working
- [ ] All features functional

## 📊 Verification Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","userType":"farmer"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Test Get Crops
```bash
curl http://localhost:5000/api/crops
```

## 🐛 Troubleshooting

### Backend Issues
- [ ] Check Node.js version: `node -v`
- [ ] Verify MongoDB connection
- [ ] Check environment variables
- [ ] Review console logs
- [ ] Test individual endpoints

### Frontend Issues
- [ ] Clear browser cache
- [ ] Check DevTools console
- [ ] Verify API URL in `.env`
- [ ] Check network requests
- [ ] Restart dev server

### Database Issues
- [ ] Verify cluster running
- [ ] Check IP whitelist
- [ ] Confirm user credentials
- [ ] Test connection string
- [ ] Check MongoDB Compass

### Image Upload Issues
- [ ] Verify Cloudinary credentials
- [ ] Check file size limits
- [ ] Confirm file format
- [ ] Review Cloudinary logs
- [ ] Test upload endpoint

## ✅ Final Verification

Before considering setup complete:

- [ ] Can register new users
- [ ] Can login and logout
- [ ] Can view crops marketplace
- [ ] Can add crops (farmer role)
- [ ] Can add items to cart
- [ ] Can create orders
- [ ] Can upload images
- [ ] Data persists in MongoDB
- [ ] Images stored in Cloudinary
- [ ] No errors in console
- [ ] All features working

## 🎉 Success Criteria

Your installation is successful when:

✅ Backend API running on port 5000  
✅ Frontend app running on port 5173  
✅ MongoDB Atlas connected  
✅ Cloudinary configured  
✅ Can register and login  
✅ Can manage crops  
✅ Can use shopping cart  
✅ Can create orders  
✅ Images upload successfully  
✅ Data persists between sessions  

## 📞 Getting Help

If you encounter issues:

1. Check error messages carefully
2. Review console logs
3. Verify environment variables
4. Test endpoints individually
5. Consult documentation:
   - `BACKEND_SETUP.md`
   - `INTEGRATION_GUIDE.md`
   - `README_BACKEND.md`
   - `PROJECT_README.md`

## 🎊 Congratulations!

If all items are checked, your AgriFarm platform is fully set up and ready to use!

---

**Next Steps**: Start building features, customize the UI, or deploy to production!

