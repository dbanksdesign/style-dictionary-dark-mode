package com.dbanksdesign.claritydesigntokensdemo;

import android.content.Context;
import android.graphics.Movie;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.dbanksdesign.claritydesigntokensdemo.databinding.ColorCardBinding;
import com.dbanksdesign.claritydesigntokensdemo.databinding.FragmentColorsBinding;
import com.dbanksdesign.claritydesigntokensdemo.model.ColorToken;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;


public class ColorsFragment extends Fragment {

    private FragmentColorsBinding binding;

    public ColorsFragment() {
        // Required empty public constructor
    }

    private void setupRecyclerView() {
        RecyclerView recyclerView = binding.colorTokenList;
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);

        List<ColorToken> colorList = new ArrayList<>();
        Field[] refs = R.color.class.getFields();
        for (Field field : refs) {
            if (field.getName().startsWith("color_")) {
                String name = field.getName();
                String type = "";
                if (name.contains("border")) {
                    type = "border";
                }
                if (name.contains("background")) {
                    type = "background";
                }
                if (name.contains("font")) {
                    type = "font";
                }
                try {
                    int ref = field.getInt(null);
                    int color = ContextCompat.getColor(this.getContext(), ref);
                    colorList.add(new ColorToken(name, type, ref));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        ColorRecyclerViewAdapter adapter = new ColorRecyclerViewAdapter(colorList);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_colors, container, false);
        setupRecyclerView();
        return binding.getRoot();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }



    public class ColorRecyclerViewAdapter
            extends RecyclerView.Adapter<ColorRecyclerViewAdapter.ColorViewHolder> {

        private final List<ColorToken> mValues;

        public ColorRecyclerViewAdapter(List<ColorToken> items) {
            mValues = items;
        }

        @NonNull
        @Override
        public ColorViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
            ColorCardBinding cardBinding = ColorCardBinding.inflate(layoutInflater, parent, false);
            return new ColorViewHolder(cardBinding);
        }

        @Override
        public void onBindViewHolder(final ColorViewHolder holder, int position) {
            ColorToken colorToken = mValues.get(position);
            holder.bind(colorToken);
        }

        @Override
        public int getItemCount() {
            return mValues.size();
        }

        public class ColorViewHolder extends RecyclerView.ViewHolder {
            private ColorCardBinding binding;

            public ColorViewHolder(ColorCardBinding binding) {
                super(binding.getRoot());
                this.binding = binding;
            }

            public void bind(ColorToken colorToken) {
                binding.setColorToken(colorToken);
                binding.executePendingBindings();
            }
        }
    }
}